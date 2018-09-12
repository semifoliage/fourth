//login.js

/*
    login the user to collect the openid and session,   store the record to session or table
*/

const config = require('../config') ;
var helper = require('../helper/helper.js')
var db=require('../helper/mysqldb.js');
var https=require('https');

const baseUrl = 'api.weixin.qq.com';
const pathUrl ='/sns/jscode2session?';
const newUserSQL = 'INSERT INTO tAccount SET ?';
const initateNewUserSQL ='insert into tHdata set ?';
const existUserSQL='select * from tAccount where openId= ?';

var options={
  host:  baseUrl,
  port: 443,
  path:  pathUrl,
  method: 'GET',
  headers: {
    'Content-Type': 'text/plain'  //'application/x-www-form-urlencoded'
  }
};

var result='', resultFinal='';

//login url interface
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    /*if (ctx.state.$wxInfo.loginState) {
        ctx.state.data = ctx.state.$wxInfo.userinfo
        ctx.state.data['time'] = Math.floor(Date.now() / 1000)
        ctx.body=ctx.state.$wxInfo
    }*/

     var _code = ctx.request.query.code;
     var _appid = config.appId;
     var _secret = config.appSecret;
     var _nickName=ctx.request.query.userInfo.nickName;
     options.path +=   'appid=' + _appid + '&secret=' + _secret + '&js_code=' + _code + '&grant_type=authorization_code';
     var urlString='https://'+options.host+options.path;
     var requestData=ctx.request.query;

     //collect user nickName and openId, session_key
     console.log('request openid and session_key from qq');
     var data=JSON.parse(await openIdRequest(urlString));
     var userInfo=JSON.parse(ctx.request.query.userInfo);
     var user=data;
     //delete data.session_key;
     data.nickName=userInfo.nickName;
     data.loginTime=helper.timeStamp();
     data.codeName=radomName(userInfo.nickName);
     data.code='0';
     data.skey=user.codeName;
     var users={
        code: 0,
        data
     }


     //check openId exist, if not create the user and initate data
     var check =await checkUser(users);
     console.log('checkuser result '+helper.timeStamp());
     console.log(check );

     ctx.response.type='JSON';
     ctx.body=JSON.stringify(check);
};

// query the openid and seessionkey from tencent net
  function openIdRequest(url){
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        res.on('data', (chunk) => {
          result += chunk;
          resolve(result);
        });
        res.on('error', (error) => {
          console.log(error);
          reject(error);
        });
        res.on('end', () => {
          console.log('https.get openid end :'+helper.timeStamp());
        });

      });
    });
  };

//check the openId records or not
async function checkUser ( user){


          var userOpenId=user.data.openid;

          var query = await existUser(existUserSQL, userOpenId);
          var queryJson=JSON.stringify(query);
          var queryStatus='';

        if(queryJson=='[]'){
            console.log('user does not exist, user data and initiate data are created' + helper.timeStamp());

            //create new user
            createNewUser(newUserSQL, user);

            //initate user data
            initateNewUserData(initateNewUserSQL, user);

            //copy the info from user to the new object and return
            var newUser=user;
            delete newUser.data.session_key;
            newUser.role1='1';
            newUser.role2='2';
            newUser.userStatus='0';

            return (newUser);
        }else {
            console.log('user exist ' +helper.timeStamp());
            //remove the sessionkey info and add query info
            var newQuery=query[0];
            console.log(newQuery);
            console.log(typeof(newQuery))
            //delete newQuery.sessionkey;
            delete newQuery.sessionkey;
            delete user.data.session_key;
            var userRecord =Object.assign({}, newQuery, user)
            newQuery.userStatus= '1';

            return(userRecord);
        }




};


// create new user record in table
  function createNewUser(sql, user){
        var codeNameNew=radomName(user.data.nickName);

        var data ={
            "codeName": codeNameNew,
            "openId": user.data.openid,
            "sessionkey": user.data.session_key,
            "nickName": user.data.nickName,
            "lastLogon_date": user.data.loginTime,
            "role1":'1',
            "role2": '1'
        };
        db.insert(sql, data, function(res){
            console.log('insert new user to tAccount table ' +helper.timeStamp())
            return res;
        });

        //package the user info when create new users
        console.log('package the user info when create new user')
        var result ={
            code: 0,
            codeName: codeNameNew,
            nickName: user.data.nickName,
            openId: user.data.openid,
            role1: '1',
            role2; '1',
            lastLogon_date: user.data.loginTime
        };
        delete user.data.session_key;
        var resultAll= Object.assign({}, result,  user.data)

        return resultAll;

  };

// initiate the data for the new user
  function initateNewUserData(sql, user){

        var todayString=helper.formatDate(new Date());
        var data= {
            "openId": user.data.openid,
            "nickName": user.data.nickName,
            "lastWeight": '60',
            "LastHDate": todayString,
            "NextHDate": todayString,
            "onH": 'N'
        };
        db.insert(sql, data, function(res){
            console.log('insert initial data to tHData table '+helper.timeStamp())
            return res;
        })


  };

//query exist user data
function existUser(sql, user){
    return new Promise((resolve, reject)=>{
        var data=[];

                  db.query(sql, [user], function(res){
                    for (var i in res){
                        data.push(res[i]);
                    };
                    console.log('check user exist or not-->' +helper.timeStamp())
                    //console.log(sql + user);
                    //console.log(data);
                   resolve(data);
                });

    })


};

//create random code for name
function radomName(name){
    return name+Math.round(Math.random()*100);

}

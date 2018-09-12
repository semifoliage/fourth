//user.js
/*
    query the user info of tAccount table
*/
var helper = require('../helper/helper.js')
var db=require('../helper/mysqldb.js');
var sqlString='select * from tAccount where codeName= ?'

module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    /*if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        ctx.state.data = ctx.state.$wxInfo.userinfo
    } else {
        ctx.state.code = -1
    }*/

    var user={
            //openid: ctx.request.query.openid,
            codeName: ctx.request.query.name
      };
    var userRecord= await userInfo(ctx.request.query.name);
    //delete userRecord[0].openId;
    delete userRecord[0].sessionkey;
    userRecord[0].skey= 'skey';
    var userQuery={
        code: 0,
        data: userRecord[0]
    };
    ctx.response.type = 'text/html';
      //responce body
    ctx.response.body = userQuery ;
};

//query database and return result
function userInfo(user){
    return new Promise ((resolve, reject)=>{

    var queryString = sqlString;
    var data= user;
    var results = [];

    db.query(queryString, [user], function(res){
            for (var i in res){
                results.push(res[i]);
            };
            resolve(results);
        } );
    });
   };


//inputAfterHSv.js

const { message: { checkSignature } } = require('../qcloud')
var helper = require('../helper/helper.js')
var insertAllSql='INSERT  INTO tHallData SET ? ';
var updatePartSql='UPDATE tHdata SET nickName= ? , lastWeight = ? , LastHDate = ? , NextHDate = ? , onH= ? WhERE openId= ? ';
var db=require('../helper/mysqldb.js');
var dbPool=require('../helper/mysqlPool');

var queryIdDateSql='select * from tHallData where openId= ? and dateToH = ?'

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Business_1',
  database: 'app1'
});



/**
 * response get request
 */
async function get(ctx, next) {

  //const { signature, timestamp, nonce, echostr } = ctx.query
  // if (checkSignature(signature, timestamp, nonce)) ctx.body = echostr
  //else ctx.body = 'ERR_WHEN_CHECK_SIGNATUREdddd'

  var openId=ctx.request.query.openId;
  var nextHDate=ctx.request.query.nextHDate;
  var queryData=[openId, nextHDate];

  //check exist data
  console.log(helper.timeStamp()+'--query exist records by openid and nextHdate')
  var checkExistData=await queryIdDate(queryData);

  ctx.response.type = 'text/html';
  //ctx.response.type = 'JSON';
  //responce body
  //ctx.body = ctx.request.body;

  ctx.body = checkExistData;
}

/**
 * response Post request 
 */

async function post(ctx, next) {
  // 检查签名，确认是微信发出的请求
  const { signature, timestamp, nonce } = ctx.query
  if (!checkSignature(signature, timestamp, nonce)) ctx.body = 'ERR_WHEN_CHECK_SIGNATUREeee'

   /**
   * 解析微信发送过来的请求体
   * 可查看微信文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/custommsg/receive.html#接收消息和事件
   */
  var data=ctx.request.body;

  console.log('call Insertall'+helper.timeStamp())
  await insertAll(data);
 /* var data=ctx.request.body;
  var insertResult=await insertData(data);*/
  const body = ctx.request.body;
  //ctx.body = ctx.request.body;
  ctx.body = 'success';

        /*
        var date=new Date();
        var dateString=helper.formatTime(date);


          //insert the new all h data to tHallData table
          queryString = 'INSERT  INTO tHallData SET ? ';
          var results = {
                          "openId": ctx.request.body.openId,
                          "nickName": ctx.request.body.nickName,
                          "lastWeight": ctx.request.body.lastWeight,
                          "weightBeforeH": ctx.request.body.weightBeforeH,
                          "weightToH": ctx.request.body.weightToH,
                          "highPressureBefore" : ctx.request.body.highPressureBefore,
                          "lowPressureBefore" : ctx.request.body.lowPressureBefore,
                          "heartBeatRateB": ctx.request.body.heartBeatRateB,
                          //"highPressureBefore" : ctx.request.body.highPressureBefore,
                          //"lowPressureBefore" : ctx.request.body.lowPressureBefore,
                          //"heartBeatRateB" : ctx.request.body.heartBeatRateB,
                          "weightAfterH":ctx.request.body.weightAfterH,
                          "overH":ctx.request.body.overH,
                          "highPressureAfter":ctx.request.body.highPressureAfter,
                          "lowPressureAfter":ctx.request.body.lowPressureAfter,
                          "heartBeatRateA":ctx.request.body.heartBeatRateA,
                          "dateToH" : ctx.request.body.dateToH,
                          //"dateToH": ctx.request.body.dateToH,
                          "date": dateString,
                          "hDuration": ctx.request.body.hDuration,
                          "hospitalName": 'yueyang'
                          }


          //initialize connection
          connection.connect(function (err) {
            if (err) {
              console.error("error connection: ");
              return;
            }
            console.log('connection sueccess! ');
          });

          connection.query(queryString, results, function (err, res) {
            if (err) {
                console.log(err);
                console.log(queryString);
                console.log(results);
                throw err;}

            console.log('Last record insert id:');
          });


            //update the data to the tHdata table
            var queryStringUpdate = 'UPDATE tHdata SET nickName= ? , lastWeight = ? , LastHDate = ? , NextHDate = ? , onH= ? WhERE openId= ? ';
            var date1=new Date();
            var nextHdate=helper.newHdateCalculate(results.dateToH);
            var nextData= [
                results.nickName,
                results.weightAfterH,
                results.dateToH,
                nextHdate,
                'N',
                results.openId

            ];

            //var data=['Bob', '64.8','2018-8-21', '2018-8-23' ,'n' , 'Bobw'];
            //var string="UPDATE tHdata SET nickName= 'Bobw'  , lastWeight = '65' , LastHDate = '2018-8-15' , NextHDate = '2018-8-22' , onH= 'n' WhERE openId= 'Bobw' ";
            connection.query(queryStringUpdate, nextData, function(err, res){
                        if(err) throw err;

                    });


          //close connection
          connection.end(function (err) {
            if (err) {
              console.log('close connection error -->');
              throw err
            };
          });

          */

      }





module.exports = {
  post,
  get
};

function insertAll(data){
    return new Promise((resolve, reject)=>{
        var date=new Date();
        var dateString=helper.formatTime(date);

        var results = {
                  "openId": data.openId,
                  "nickName": data.nickName,
                  "lastWeight": data.lastWeight,
                  "weightBeforeH": data.weightBeforeH,
                  "weightToH": data.weightToH,
                  "highPressureBefore" : data.highPressureBefore,
                  "lowPressureBefore" : data.lowPressureBefore,
                  "heartBeatRateB": data.heartBeatRateB,
                  //"highPressureBefore" : ctx.request.body.highPressureBefore,
                  //"lowPressureBefore" : ctx.request.body.lowPressureBefore,
                  //"heartBeatRateB" : ctx.request.body.heartBeatRateB,
                  "weightAfterH":data.weightAfterH,
                  "overH":data.overH,
                  "highPressureAfter":data.highPressureAfter,
                  "lowPressureAfter":data.lowPressureAfter,
                  "heartBeatRateA":data.heartBeatRateA,
                  "dateToH" : data.dateToH,
                  //"dateToH": ctx.request.body.dateToH,
                  "date": dateString,
                  "hDuration": data.hDuration,
                  "hospitalName": 'yueyang'
                  };

        //insert all data
        console.log('insert all data to database'+helper.timeStamp())
        db.query(insertAllSql, results, function(res){
                        console.log('all H data inserted to server')

                    } );

        //update hHdata table
        var date1=new Date();
        var nextHdate=helper.newHdateCalculate(data.dateToH);
        var partResult= [
            data.nickName,
            data.weightAfterH,
            data.dateToH,
            nextHdate,
            'N',
            data.openId

        ];

        console.log('update Htabel start '+helper.timeStamp())
        db.query(updatePartSql, partResult, function(res){
                        console.log('htable is updated successfully ')

        });

         resolve ('correct');

    })
};

function queryIdDate(data){
  return new Promise((resolve, reject)=>{
    dbPool.query(queryIdDateSql, data, function(res){
      console.log(helper.timeStamp()+'--query tHallData table to get openid and nextHdate successfully ')
      console.log(res);
      resolve(res);
    })


  })

}



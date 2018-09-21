//recognizer.js
/*
    this file provides the function to image to work
    calling the OCR service of qq
*/
const config = require('../config') ;
var crypto = require('crypto');
var helper = require('../helper/helper.js')
var db=require('../helper/mysqldb.js');
var https=require('https');
var http=require('http');

var requestHost='recognition.image.myqcloud.com';
var _appid = config.appId;
var _secret = config.appSecret;
var _bucket='';
var _url='';

//encode the secret id
var _ocrAppid=config.ocrAppid,
    _ocrSecredId=config.ocrSecredId,
    _ocrSecretKey=config.ocrSecretKey,
    pexpired = 86400 ,
    userid = 0;

var now = parseInt(Date.now() / 1000),
    rdm = parseInt(Math.random() * Math.pow(2, 32)),
    plainText = 'a=' + _ocrAppid + '&k=' + _ocrSecredId + '&e=' + (now+pexpired) + '&t=' + now + '&r=' + rdm + userid + '&f=',
    data = new Buffer(plainText,'utf8'),
    res = crypto.createHmac('sha1',_ocrSecretKey).update(data).digest(),
    bin = Buffer.concat([res,data]);

var sign = bin.toString('base64');


var options={

    host: requestHost,
    port: 80,
    path: '/ocr/general',
    method: 'POST',
    heads : {
        'Content-Length': 187,
        'Content-Type': 'application/json',
        'Authorization': sign,
    },
    Image: '../helper/aaa.png'

}

var ocrImage =  async function (  image){
    console.log(helper.timeStamp() +'--start query qq for image ')
    var st=await query(options);
   return  st;

}

function query(opt){
    var result='';
    return new Promise ((resolve, reject)=>{
        http.request(opt, (res)=>{
                res.on('data', (chunk) => {
                  result += chunk;
                  console.log(helper.timeStamp() +'--requst image suceesee');
                  console.log(chunk)
                  resolve(result);
                });
                res.on('error', (error) => {
                  console.log(helper.timeStamp() +'--requst image failed')
                  console.log(error);
                  reject(error);
                });
                res.on('end', () => {
                  console.log( helper.timeStamp() +'--https.get image to OCR :');
                });
            })

    })
}


module.exports = { ocrImage}
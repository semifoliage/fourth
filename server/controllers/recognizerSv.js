//recognizerSv.js
/*
    this interface is to provide the image uploader.
*/
const config = require('../config') ;
var helper = require('../helper/helper.js')
var db=require('../helper/mysqldb.js');
var crypto = require('crypto');
var http=require('http');
var request=require('request');
var fs=require('fs');
var path=require('path');
var querystring = require('querystring');

//inital data
var requestHost='recognition.image.myqcloud.com',
    requestPath='/ocr/general';

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




async function get(ctx, next) {

    var imgUrl=ctx.request.query.img;
    var post_data = querystring.stringify({
        "appid": _ocrAppid,
        "bucket": 'test',
        "url": imgUrl
    })
    var formData: {
                card_type: 0,
                appid:  _ocrAppid,
                bucket: '',
                image: fs.createReadStream(path.join(__dirname, '../helper/aaa.png'))
            },

    //set request options
    var options={

        hostname: requestHost,
        port: 80,
        path: requestPath,
        method: 'POST',
        headers : {
            'Host': requestHost,
            'Content-Length': Buffer.byteLength(post_data),
            'Content-Type': 'multipart/form-data',//'application/json',
            'Authorization': sign
        }
    }
    console.log(helper.timeStamp() +'--send request to internal function for OCR result')

    var st= await query(options, formData );


    console.log(st)

    ctx.response.type='text/html';
    ctx.body=ctx.request.query; //JSON.stringify(st);

};
async function post(ctx, next) {};

module.exports = {
  post,
  get
};


function query(opt, data ){
    /*var result='';
    console.log(helper.timeStamp() +'--start the query for OCR from QQ')
    console.log(opt)*/
    return new Promise ((resolve, reject)=>{
        try
            {
                 /*http.request(opt,   (res)=>{
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
                    });*/
                    console.log('http://'+opt.hostname+opt.path)
                 request({
                    url: 'http://'+opt.hostname+opt.path,
                    method: 'POST',
                    headers: opt.headers,
                    formData: JSON.stringify(data),
                    function(error, response, body){
                         if (!error && response.statusCode == 200) {
                                console.log(response)

                            }else {
                                console.log('request failed')
                                console.log(error)
                                console.log(response.statusCode)
                            }
                    }


                 })

            }
            catch(err)
            {
                console.log(helper.timeStamp() +'--request faild')
                console.log(err)
            }

    })
}

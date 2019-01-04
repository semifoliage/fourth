const {uploader} = require('../qcloud');
var fs=require('fs');
const config = require('../config') ;
var crypto = require('crypto');
var helper = require('../helper/helper.js')
var db=require('../helper/mysqldb.js'); 
var http=require('http');
var queryString= require('querystring')
var multiparty = require('multiparty');

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



module.exports = async ctx => {
    //check ctx.request 
    console.log(helper.timeStamp() +'--ctx request ');
    console.log(ctx.request);
    console.log(helper.timeStamp() +'--ctx request.header');
    console.log(ctx.request.header);    
          
    //var timeStamp=new Date().getTime();    
   
    //set request options
    var options={
      hostname: requestHost,
      port: 443,
      path: requestPath,
      method: 'POST',
      headers : {
          'Host': requestHost,
          'Content-Length': 187,//Buffer.byteLength(post_data),
          'Content-Type': 'multipart/form-data',//'application/json',
          'Authorization': sign
      },
      formData: data 
    };
    
    console.log(helper.timeStamp() +'--ocr reqeust.options creating')
    console.log(options);    
    var url=ctx.request.query.url;
    
    //collect req content
    console.log(helper.timeStamp() +'--mutiparty collect req contents');
    var imageObj={
        originalFilename: '',
        path:'',
        user:'',
        openId:'',
        nickName:'',
        date:''
    };  

    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.parse(ctx.req, function(err, fields, files){
        //error process
        if(err){
            console.log(err);
            var u={"error" :1,"message":'请上传5M以图片'};
            res.end(JSON.stringify(u));
            return false;
        }else {
            console.log("files.file:"+JSON.stringify(files.file));
            console.log(files.file[0]);
            console.log(fields);
            imageObj.originalFilename=files.file[0].originalFilename;
            imageObj.path=files.file[0].path;
            imageObj.user=fields.user[0];
            imageObj.openId=fields.openId[0];
            imageObj.nickName=fields.name[0];
            imageObj.date=fields.date[0];
            console.log(helper.timeStamp() +'--imageobject ');
            console.log(imageObj);
             ;
            }
                     
    });

     //initiate the data for ocr data
     var data= {
        card_type: 0,
        'appid':  _ocrAppid,
        'bucket': '',
        'url': imageObj.path//fs.createReadStream(path.join(__dirname, '../helper/aaa.png'))
    };
    console.log(helper.timeStamp()+ '--initial data for ocr data');
    console.log(data);

    //send the image to internal function for OCR
    console.log(helper.timeStamp() +'--send request to internal function for OCR result');
    //var st= await query(options, imageObj);
     
    
    ctx.response.type = 'JSON';
    
   
  //responce body
    ctx.body =imageObj;//ctx.req;// query2;//queryString.parse( ctx.req);
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
                  /*
                  var options2={
                      url: 'http://'+opt.hostname+opt.path,
                      headers: opt.headers,
                      formData: data
                  };

                  request(options2, function(error, response, body){
                      if (!error && response.statusCode == 200) {
                      var info = JSON.parse(body);
                      console.log(info.stargazers_count + " Stars");
                      console.log(info.forks_count + " Forks");
                        }

                  })*/
                  
               var r= request.post(
                  url= 'https://'+opt.hostname+opt.path,                    
                  headers= opt.headers,
                  data= data);
               var responseInfo=r.content;
               console.log(responseInfo);
                   /*
                  function(error, response, body){
                       if (!error && response.statusCode == 200) {
                              console.log(response)

                          }else {
                              console.log('request failed')
                              console.log(error)
                              console.log(response.statusCode)
                          }
                  }


               })*/

          }
          catch(err)
          {
              console.log(helper.timeStamp() +'--request faild')
              console.log(err)
          }

  })
};

//sample function
// 解析上下文里node原生请求的POST参数
function parsePostData( ctx ) {
    return new Promise((resolve, reject) => {
        try {
            let postdata = "";
            ctx.req.addListener('data', (data) => {
                postdata += data
            })
            ctx.req.addListener("end",function(){
                let parseData = parseQueryStr( postdata )
                resolve( parseData )
            })
        } catch ( err ) {
            reject(err)
        }
    })
} 


function parseQueryStr( queryStr ) {
    let queryData = {}
    console.log('ctx.req in paresQueryStr..................');
   // console.log(queryStr);
    let queryStrList = queryStr.split('&')
    console.log('querystringlist---------------')
    //console.log( queryStrList[1] )
    for (  let [ index, queryStr ] of queryStrList.entries()  ) {
        let itemList = queryStr.split('=')
        queryData[ itemList[0] ] = itemList[i];//decodeURIComponent(itemList[1])
    }
    return queryData
}

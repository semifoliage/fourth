const { uploader } = require('../qcloud');
var fs=require('fs');



module.exports = async ctx => {
    // 获取上传之后的结果
    // 具体可以查看：
    //const data = await uploader(ctx.req);

    var openId=ctx.request.query.openId;
    var name=ctx.request.query.name;
    var checkDate=ctx.request.query.date;
    var timeStamp=new Date().getTime();
    var path='img_tmp/'+openId+'_'+timeStamp+'_'+name+'_'+checkDate;
    
    var url=ctx.request.query.url;
    var writerStream = fs.createWriteStream(path);

    ctx.state.data = data;

    ctx.response.type = 'html/text';
  //responce body
     ctx.body = ctx.req;
}

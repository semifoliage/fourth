//scanReport
/*
*/

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config.js')
var util = require('../../utils/util.js')
var page = require('../../utils/pageContent.js')
var text=page.index.data;


Page({
  data: {
    userInfo: {},
    openId:'openId',
    nickName: 'nickName',
    src:'',
    imgUrl:''
  },

  onLoad() {

  },

  //take a photo
  takePhoto() {
    this.ctx = wx.createCameraContext()
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },

  //start Record
  startRecord() {
    //chose image
    console.log('chose image to send')
    var that =this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log('tempfilepaths');
        console.log(tempFilePaths[0])
        that.setData({
          src: tempFilePaths
        })

        //send the image to server
        console.log('send image to backend server');         
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type':'multipart/form-data'
          },  
          formData: {
            'user': 'test',
            "openId": that.data.openId,
            "name": that.data.nickName,
            "date": '2018-1-1'  
          },

          success: function(res){
              util.showSuccess('上传图片成功')
              console.log(res)
              res = JSON.parse(res.data)
              console.log(res)
              that.setData({
                  imgUrl: res.data//
              })
          },

          fail: function(e) {
              console.log(e.errMsg);
              util.showModel('上传图片失败')
          }
       })

       /*
        var imageUrl=that.data.src[0]
        wx.request({
                    url: `${config.service.ocrImageUrl}`,
                    login: false,
                    data: {img:imageUrl},
                    success(result) {},
                    fail(error) {}
                })  */
      }
    });




    /*this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })*/
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
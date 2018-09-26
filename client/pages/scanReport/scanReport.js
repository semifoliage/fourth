//scanReport
/*
*/

var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config.js')
var util = require('../../utils/util.js')
var page = require('../../utils/pageContent.js')
var text=page.index.data;


Page({
  onLoad() {

  },
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
        console.log(tempFilePaths)
        that.setData({
        src: tempFilePaths})

        //send the image to server
        console.log('send image to backend server');
        var imageUrl=that.data.src[0]
        wx.request({
                    url: `${config.service.ocrImageUrl}`,
                    login: false,
                    data: {img:imageUrl},
                    success(result) {},
                    fail(error) {}
                })
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
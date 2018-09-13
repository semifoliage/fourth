//pages/i;;'dd'''ddvvnputDataOneShow/inputDataOneShow.js
/*
    reshown the h firat data to doctor and update the weightToH

*/
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var services= require('../../utils/services')
var page= require('../../utils/pageContent.js')
var pageText=page.inputDataOneShow.text;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nickName:'',
    openId:'',
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    saveNextButtonStatus: false,
    hDate:'',
    weight_lasttimeNum: '',
    weightToHNum: '',
    beforeWeightNum: '',
    bloodHighNum:'',
    bloodLowNum:'',
    heartBitNum:'',
    next: "Save and Next",
    nextStatus: false,
    save: "Next",
    saveStatus: true,
    service: {
        pageTitle: 'Hello World really?',
        systemDate: '',
        userAccount: 'lala',
        inputValue: '',
        weight_lasttime: "Weight of last time",
        weight_lasttimeNum: "",
        beforeWeight: "before Weight (kg)",
        beforeWeightNum: '',
        weightToH: "weight to Hm",
        weightToHNum: "20",
        bloodHigh: 'Blood High Press',
        bloodHighNum:'',
        bloodLow:'Blood Low Press',
        bloodLowNum:'',
        heartBit: 'Heart Bit Number',
        heartBitNum:'',
        canIUse: wx.canIUse('button.open-type.getUserInfo')

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    //console.log(pageText.pageTitle}
    this.setData({
        title: options.title,
        nickName:options.nickName,
        openId:options.openId,
        hDate: options.dateToH,
        weight_lasttimeNum: options.lastWeight,
        weightToHNum: options.weightToH,
        beforeWeightNum: options.weightBeforeH,
        bloodHighNum: options.highPressureBefore,
        bloodLowNum: options.lowPressureBefore,
        heartBitNum: options.heartBeatRateB,
        next: "Next",
        nextStatus: options.oH == 'N' ? false: true,
        save: options.oH == 'N' ? "Save Data" :"Update Data" ,
        saveStatus: options.oH == 'N' ? true : false,
        service: {
              pageTitle: pageText.pageTitle,
              systemDate: '',
              userAccount: 'lala',
              inputValue: '',
              weight_lasttime: pageText.weight_lasttime,
              weight_lasttimeNum: "",
              beforeWeight: pageText.beforeWeight,
              beforeWeightNum: '',
              weightToH: pageText.weightToH,
              weightToHNum: "20",
              bloodHigh: pageText.bloodHigh,
              bloodHighNum:'',
              bloodLow:pageText.bloodHigh,
              bloodLowNum:'',
              heartBit: pageText.heartBit,
              heartBitNum:'',
              canIUse: wx.canIUse('button.open-type.getUserInfo')

            }
         })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
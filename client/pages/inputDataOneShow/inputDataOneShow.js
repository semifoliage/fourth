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
    weightToHAdjustNum:'',
    analyzeWeight:'',
    beforeWeightNum: '',
    bloodHighNum:'',
    bloodLowNum:'',
    heartBitNum:'',
    okButton: "Save and Next",
    okButtonStatus: false,
    updateButton: "Next",
    updateButtonStatus: true,
    nextButton:'',
    service: {
        pageTitle: 'Hello World really?',
        systemDate: '',
        userAccount: 'lala',
        inputValue: '',
        weight_lasttime: "Weight of last time",
        weight_lasttimeNum: "",
        beforeWeight: "before Weight (kg)",
        beforeWeightNum: '',
        analyzeWeightNum: '',
        weightToH: "weight to Hm",
        weightToHAdjust: "",
        weightToHNum: "20",
        bloodHigh: 'Blood High Press',
        bloodHighNum:'',
        bloodLow:'Blood Low Press',
        bloodLowNum:'',
        heartBit: 'Heart Bit Number',
        heartBitNum:'',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        kg: ""

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    console.log(options)
    //console.log(pageText.pageTitle}
    this.setData({
        title: options.title,
        nickName:options.nickName,
        openId:options.openId,
        hDate: options.hDate,
        weight_lasttimeNum: options.lastWeight,
        analyzeWeightNum: options.weightBeforeH-options.weightToH,
        weightToHNum: options.weightToH,
        weightToHAdjustNum: options.weightToH,
        beforeWeightNum: options.weightBeforeH,
        bloodHighNum: options.highPressureBefore,
        bloodLowNum: options.lowPressureBefore,
        heartBitNum: options.heartBeatRateB,
        okButton: pageText.okButton,
        okButtonStatus: options.oH == 'N' ? false: true,
        updateButton: pageText.updateButton,
        saveStatus: options.oH == 'N' ? true : false,
        nextButton: pageText.nextButton,
        service: {
              pageTitle: pageText.pageTitle,
              systemDate: '',
              userAccount: 'lala',
              inputValue: '',
              weight_lasttime: pageText.weight_lasttime,
              weight_lasttimeNum: "",
              beforeWeight: pageText.beforeWeight,
              beforeWeightNum: '',
              analyzeWeight: pageText.analyzeWeight,
              weightToH: pageText.weightToH,
              weightToHAdjust: pageText.weightToHAdjust,
              weightToHNum: "20",
              bloodHigh: pageText.bloodHigh,
              bloodHighNum:'',
              bloodLow:pageText.bloodHigh,
              bloodLowNum:'',
              heartBit: pageText.heartBit,
              heartBitNum:'',
              canIUse: wx.canIUse('button.open-type.getUserInfo'),
              kg: pageText.kg
            }
         })



  },
  adjustInput: function(e){
     //number validate
     if(!services.numberValidate(e.detail.value)&& e.detail.cursor==0){
                return
              }
    //console.log(e);
    this.setData({
        weightToHAdjustNum: e.detail.value
    })
  },

  backToInputOne: function(e){
    var string='&openId='+this.data.openId
               +'&nextHDate='+this.data.hDate
               +'&nickName='+this.data.nickName
               +'&weight=' + this.data.weight_lasttimeNum
               +'&onH='+'Y'
     wx.navigateTo({
          url: '../inputDataOne/inputDataOne?title=Input Data One'+string,
        });
  },

  goToInputTwo: function(e){
     var string= '&weightToH='+this.data.weightToHNum
                +'&hDate='+this.data.hDate
                +'&nickName='+this.data.nickName
                +'&openId='+this.data.openId
                +'&weightBeforeH='+this.data.beforeWeightNum
                +'&lastWeight='+ this.data.weight_lasttimeNum
                +'&highPressureBefore=' +this.data.bloodHighNum
                +'&lowPressureBefore='+ this.data.bloodLowNum
                +'&heartBeatRateB='+ this.data.heartBitNum
                +'&weightToHadjust'+ this.data.weightToHAdjustNum
                +'&hospitalName='+ ''

    wx.navigateTo({
      url: '../inputDataTwo/inputDataTwo?title=Input Data Two'+string,
    });
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
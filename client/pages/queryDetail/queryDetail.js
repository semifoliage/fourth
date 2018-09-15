// pages/queryDetail/queryDetail.js
/*
  display the detial the data info
*/
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var services=require('../../utils/services.js');
var page= require('../../utils/pageContent.js');
var text=page.index.data;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'Detail Page',
    userInfo: {},
    logged: false,
    nickName: '',
    userInfo: '',
    openId: '',
    isInList: {},
    selectedRecord:{},
    recordDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    // show loading
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 0
    });
    //check whether in list
    if (options.isInList === '0' || options.isInList === '1') {
      that.setData({ isInList: parseInt(options.isInList) });
    } else {
      var records = wx.getStorageSync('list');
      var isInMyRecord = records.some(function (item) {
        return item.idRecord == options.id;
      }); 
      //pick the selected id records
      console.log('pick the selected id records')
      if(isInMyRecord){ 
        var selectedId=records.find(function(item){           
          if(item.idRecord==options.id){
            return item
          }
        })        
        that.setData({
          isInList: isInMyRecord ? 1 : 0,
          selectedRecord: selectedId,
          recordDetail: selectedId
        });
        console.log(that.data.selectedRecord)
      }

    }

  },
  next: function () {
    var string = '?title=Main Page'
      + '&nickName=' + this.data.nickName
      + '&openId=' + this.data.openId;
    wx.switchTab({
      url: '../index/index',
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
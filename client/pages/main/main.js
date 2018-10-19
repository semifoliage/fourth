// pages/main/main.js

/*
    main tab of the operation
*/
var app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var services=require('../../utils/services.js')
var page=require('../../utils/pageContent.js')
var text=page.main.data;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
        nickName:'',
        openId:'',
        logged: false,
        takeSession: false,
        requestResult: 'suc',
        weight:'',
        lastHDate:'',
        nextHDate:'',
        lastWeight:'',
        onH:'',
        beforeHstatus: false,
        afterHstatus:true,
        service: {
          pageTitle: 'Hello World really?',
          lastHDateText: 'Last H Date: ',
          lastHWeightText: 'Last H Weight: ',
          nextHDateText: "Next H Date: ",
          nextHstartText: "Next H Start?",
          nextHstart: "",
          submit: "submit",
          inputDataOne: "input 1st record",
          beforeHstatus: false,
          inputDataTwo: "input 2st record",
          afterHstatus:true,
          queryData: "query previous last records" ,
          canIUse: wx.canIUse('button.open-type.getUserInfo')
        },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log('option of main page');
    console.log(e);
    this.setData({
          logged: true,
          userInfo: JSON.parse(e.userInfo),
          openId: e.openId
        });
     console.log('query the H initial data in Main Page')
     var that =this;
    //query inital H info
    wx.request({
          url:   `${config.service.userHInfoUrl}`,
          login: false,
          data: {user:e.openId},
          success(result) {
            util.showSuccess('请求成功完成')
            console.log('user initial H data collected ')
            console.log(result)
            that.setData({
                title: 'Main Page',
                openId: result.data[0].openId,
                nickName: result.data[0].nickName,
                lastHDate: result.data[0].LastHDate,
                nextHDate: result.data[0].NextHDate,
                lastHWeight: result.data[0].lastWeight,
                onH: result.data[0].onH,
                beforeHstatus: result.data[0].onH=='N'? false: true ,
                afterHstatus : result.data[0].onH=='N'? true: false ,
                service: {
                  pageTitle:  util.formatAll(util.todayDate())+'s' ,// + day + '/' + monthIndex + '/' + year,
                  lastHDate: result.data[0].LastHDate,
                  lastHDateText: text.lastHDateText,
                  lastHWeight: result.data[0].lastWeight,
                  lastHWeightText: text.lastHWeightText,
                  nextHDate: result.data[0].NextHDate,
                  nextHDateText: text.nextHDateText,
                  nextHstartText: text.nextHstartText,
                  nextHstart: result.data[0].onH=="Y"? text.start: text.notStart,
                  submit: "submit",
                  inputDataOne: result.data[0].onH=="Y" ? text.inputDataOneUpdate: text.inputDataOneNew,
                  beforeHstatus: result.data[0].onH == 'Y' ,
                  inputDataTwo: text.inputDataTwo,
                  queryData: text.queryData,
                  listAllData: "list all old data",
                  onH: result.data[0].onH,

              }


            });

          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
          }
        });

  },

  //onShow method
  onShow: function(options){
    if(this.data.nextHDate==''){
      console.log('lalal-show'+options)
    }
  },

  //start input the data ,
  inputData1stButton: function(){
      //console.log('st:' + weight_todelete);
      /*this.setData({

          beforeHstatus: true

      })*/

      //collect date to navigate to input data one page 
      var string='?title=Input Data One&weight=' + this.data.lastHWeight
                            + '&nextHDate=' + this.data.nextHDate
                            +'&nickName='+this.data.nickName
                            +'&openId='+this.data.openId
                            +'&onH='+this.data.onH;

      //check the nextHDate is existing in tHallData table or not
      var that=this;
      queryExistData(this.data.openId, this.data.nextHDate, that).then(function(check){      
          if( check =='yes')
              {
                
                util.showModel(text.nextHdateExist, text.inputNewDate)
                return;

              }else{  
                //navigate to the input data one page
                /*var string='?title=Input Data One&weight=' + that.data.lastHWeight
                            + '&nextHDate=' + this.data.nextHDate
                            +'&nickName='+this.data.nickName
                            +'&openId='+this.data.openId
                            +'&onH='+this.data.onH;  */
                wx.navigateTo({
                  url: '../inputDataOne/inputDataOne'+string//?title=Input Data One&weight=' + this.data.lastHWeight + '&nextHDate=' + this.data.nextHDate +'&nickName='+this.data.nickName+'&openId='+this.data.openId,
                })
            }
      }) 
      
    },

    //if the first data is entered , go to next phase
    inputData2ndButton: function () {
      //console.log('st:' + weight_todelete);
      wx.navigateTo({
        url: '../inputDataTwo/inputDataTwo?title=Input Data Two&weight=' + this.data.service.lastHWeight,
      })
    },

    //query the history data
    queryHistoryData: function(e){
        var string='?title=Query History Data'
                      +'&nickName='+this.data.nickName
                      +'&openId='+this.data.openId
                      +'&userInfo='+ JSON.stringify(this.data.userInfo)
        wx.navigateTo({
          url: '../queryList/queryList'+string//?title=Input Data One&weight=' + this.data.lastHWeight + '&nextHDate=' + this.data.nextHDate +'&nickName='+this.data.nickName+'&openId='+this.data.openId,
        })
    },
    //userless
    queryListButton: function(options){
      wx.navigateTo({
        url: '../queryList/queryList?title=List All Data&weight=' + this.data.service.lastHWeight,
      })
    },
    //userless
    chessAction : function(options){
      wx.navigateTo({
          url: '../chess/chess'
      })
    },

    //handle date picker is changed
    bindDateChange: function(e){
      console.log('picker发送选择改变，携带值为', e.detail.value);
      console.log(e);
      
      if(e.target.id=='lastHDate'){
        this.setData({
          lastHDate: e.detail.value
        })
      }else if(e.target.id=='nextHDate'){
        var dateChange='nextHDate';
        this.setData({
          nextHDate: e.detail.value
        });
      }
    },

    //handle the lastWeight is changed
    lastWeightKeyInput: function(e){
      //console.log(e)
      if(!services.numberValidate(e.detail.value)&& e.detail.cursor==0){
        return
      }
      this.setData({
        lastHWeight: e.detail.value
      })
    },

    //show the data all in summary page    not used
    inputDataShow: function(e){
        wx.navigateTo({
                url: '../inputDataOneShow/inputDataOneShow'//?title=List All Data&weight=' + this.data.service.lastHWeight,
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

function setPageData(opetions, that){
    return new Promise ((resolve, reject)=>{
        console.log(options);
        that.setData({
          logged: true,
          userInfo: JSON.parse(options.userInfo),
          openId: options.openId
        })
        resolve ('data set')
    })

};

function queryUserInitialData(data, sql){
    return new Promise((resolve, reject)=>{
         wx.request({
          url:   `${config.service.userHInfoUrl}`,
          login: false,
          data: {user:this.data.openId},
          success(result) {
            util.showSuccess('请求成功完成')
            console.log('user initial H data collected ')
            //console.log(result)
            resolve (result);
          },
          fail(error) {
            util.showModel('请求失败', error);
            console.log('request fail', error);
          }
        });

    })


};

 //check userId and selected nextHDate is exist or not 
 function queryExistData(user, date , that){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: `${config.service.inputSecondDataUrl}`,
      login: false,
      data:{
        openId: user,
        nextHDate: date
      },
      success(result){
        console.log('nextHdate is checked in database');         
        var res=verifyQuery(result.data);  
        //console.log(res)       
        resolve(res)
      },
      fail(error){
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }

    })
  })

};

//verify the query data is empty array or not 
function verifyQuery(data){
  if(data.length==0){
    //if data do not exist return false
    return 'no';
  }else {
    //if data exist return true
    return 'yes';
  }
}
// pages/queryList/queryList.js//queryList.js
    const app = getApp()
    var qcloud = require('../../vendor/wafer2-client-sdk/index')
    var config = require('../../config')
    var util = require('../../utils/util.js')
    var services= require('../../utils/services')
    var order = ['red', 'yellow', 'blue', 'green', 'red']
    var page=require('../../utils/pageContent.js')
    var text=page.queryList.data;  

    Page({
     data: {
       userInfo: {},
       logged: false,
       nickName:'',
       userInfo:'',
       openId:'',
       today: util.formatDate(new Date()),
       lastHDate: '2018-08-19',
       takeSession: false,
       requestResult: '',
       imgUrl: '',
       toView: 'red',
       scrollTop: 100,
       records: [],
       err_page_data: null,
       showModal: false,
        //navigation
       tabs: [text.before, text.after ],
       activeIndex: 0,
       sliderOffset: 0,
       sliderLeft: 0,        
       //data
       lastHDate:'0',
       weightLastTimeNum:'weightLastTimeNum',
       weightBeforeHNum:'weightBeforeHNum',
       weight_toHNum: 'weight_toHNum',
       adjuestWeight_toHNum:'adjuestWeight_toHNum',
       bloodPresssureHighB: 'bloodPresssureHighB',
       bloodPressureLowB:'bloodPressureLowB',
       heartBitB:'heartBitB',
       afterHweight: 'afterWeight',
       weightHNum:'weightHNum',
       overHNum:'overHNum',
       hDuration:'4 hours',
       bloodPresssureHighA:'bloodPresssureHighA',
       bloodPressureLowA:'bloodPressureLowA',
       heartBitA:'heartBitA',
       //text
       service: {
        dataInput: text.dataInput,
        today: text.today,
        lastHDateText: text.lastHDateText,
        weightBeforeH: text.weightBeforeH,
        weight_toH: text.weight_toH,
        afterWeight: text.afterWeight,
        weightH:text.weightH,
        OverH:text.OverH,
        hDuration: text.hDuration,
        bloodHighPressureBefore:text.bloodHighPressureBefore,
        bloodLowPressureBefore: text.bloodLowPressureBefore,
        heartBitBefore: text.heartBitBefore,
        afterHWeight: text.afterHWeight,
        weightLastTime: text.weightLastTime,
        adjuestWeight_toH: text.adjuestWeight_toH,
        bloodHighPressureAfter: text.bloodHighPressureAfter,
        bloodLowPressureAfter:text.bloodLowPressureAfter,
        heartBitAfter: text.heartBitAfter
       }
     },

    onLoad: function (options) {
        console.log(options)
       this.setData({
             logged: true,
             nickName: app._nickName,
             userInfo: JSON.parse(options.userInfo),
             openId: app._userInfo.data.openId
       });

       //query all data
       var that = this;
             wx.request({
               url: `${config.service.queryAllDataUrl}`,
               data: {openId:options.openId},
               success: function (res) {
                 var records = res.data;
                 console.log('信息' +records.length);
                 records.forEach(function (item) {
                   item.isShow = true;
                 });
                 //update the view
                 that.setData({
                       records: records
                       });
                 //将书单数据缓存到本地
                 wx.setStorage({
                   key: 'list',
                   data: records,
                   success: function (res) {
                     console.log('成功保存所有记录到本地缓存');
                   }
                 });
               },
               fail: function () {
                 //显示网络错误提示页面
                 //先获取本地缓存中的书单数据，并提示网络错误，若本地没有缓存数据，显示app状态页
                 wx.getStorage({
                   key: 'list',
                   success: function (res) {
                     console.log('使用本地缓存的数据');
                     if (res.data && res.data[0].factionName) {
                       that.setData({ records: res.data });
                     } else {
                       that.setData({
                         err_page_data: {
                           show: true,
                           image_url: 'https://olpkwt43d.qnssl.com/myapp/err_tips/network_err.png',
                           text: '努力找不到网络>_<请检查后重试',
                           buttonText: '重试',
                           click: 'queryAll'
                         }
                       });
                     }
                   },
                   fail: function (err) {
                     console.log('获取缓存失败' + err);
                     that.setData({
                       err_page_data: {
                         show: true,
                         image_url: 'https://olpkwt43d.qnssl.com/myapp/err_tips/network_err.png',
                         text: '努力找不到网络>_<请检查后重试',
                         buttonText: '重试',
                         click: 'queryAll'
                       }
                     });
                   }
                 });
                 console.log("请求列表失败");
                 that.setData({
                   err_page_data: {
                     show: true,
                     image_url: 'https://olpkwt43d.qnssl.com/myapp/err_tips/network_err.png',
                     text: '努力找不到网络>_<请检查后重试',
                     buttonText: '重试',
                     click: 'query'
                   }
                 });
               },
               complete: function () {
                 //请求完成结束loading
                 wx.hideToast();
               }
             })


    },
    //to show detail page
    goToDetail: function(e){
       var currentId = e.currentTarget.dataset.id;
       wx.navigateTo({
             url: '../queryDetail/queryDetail?id=' + currentId
           });

    },

    //show the button
    showDialogBtn: function () {
       this.setData({
         showModal: true
       })

     },

     //click cancel button on the popup view
     onCancel: function(){
       this.setData({
         showModal: false
       })
     },
     
     //click confirm button on the popup view
     onConfirm: function(){ 
       //verify the necessary data are inputted or not       
        if(this.data.lastHDate=='0'|| this.data.weightLastTimeNum==''||this.data.weightBeforeHNum==''||this.data.afterHweight==''){
          util.showModel('important data not inputed', 'please try to input again')
          return;
        }
        console.log(this.data.lastHDate)

        //prepare the data to database
        var datas= {
                    openId: this.data.openId,
                    nickName: this.data.nickName,
                    dateToH: this.data.lastHDate,
                    lastWeight: this.data.weightLastTimeNum,
                    weightBeforeH: this.data.weightBeforeHNum,
                    weightToH: this.data.weight_toHNum,
                    //adjuestWeight_toHNum:this.data.adjuestWeight_toHNum,
                    highPressureBefore: this.data.bloodPresssureHighB,
                    lowPressureBefore: this.data.bloodPressureLowB,
                    heartBeatRateB: this.data.heartBitB,
                    weightAfterH: this.data.afterHweight,
                    //weightHNum: this.data.weightHNum,
                    overH: this.data.overHNum,
                    hDuration:'4',
                    date: '',
                    hightPressureAfter:this.data.bloodHighPressureAfter,
                    lowPressureAfter: this.data.bloodPressureLowA,
                    heartBeatRateA: this.data.heartBitA
            };

        //check openId and hdate exist or not 
        var that =this;
        queryExistData(this.data.openId, this.data.lastHDate, that).then(function(check){      
          if( check =='yes')
              {
                
                util.showModel(text.nextHdateExist, text.inputNewDate)
                return;

              }else{  
                console.log('date is not exist and start insert date to database')

                //insert data to database 
                insertData(datas).then(function(res){
                  console.log(res);
                  util.showBusy('successfu insert');

                  //hide the popup view
                  this.setData({
                    showModal: false
                  })
                });

              }
          }) 
     },

     //h date selected 
     bindDateChange: function(e){
      this.setData({
        lastHDate: e.detail.value
      })

     },

     //data input check
      dataKeyInput :function(e){
        //number validate
          if(!services.numberValidate(e.detail.value)&& e.detail.cursor==0){
                  return
                }
            //checkdata    
            var that=this;
            switch(e.target.id)
            {
              case 'weightLastTimeNum':
                this.setData({
                  weightLastTimeNum : e.detail.value
                });
                var weigh=calWeightToH(this.data.weightLastTimeNum, this.data.weightBeforeHNum, that)
                this.setData({
                  weight_toHNum: weigh.toFixed(1)
                })
                break;
              case 'weightBeforeHNum':
                this.setData({
                  weightBeforeHNum : e.detail.value
                });
                var weigh=calWeightToH(this.data.weightLastTimeNum, this.data.weightBeforeHNum, that)
                this.setData({
                  weight_toHNum: weigh.toFixed(1)
                })
                break;
              case 'adjuestWeight_toHNum':
                this.setData({
                  adjuestWeight_toHNum : e.detail.value
                });
                break;
              case 'bloodPresssureHighB':
                this.setData({
                  bloodPresssureHighB : e.detail.value
                });
                break;
              case 'bloodPressureLowB':
                this.setData({
                  bloodPressureLowB : e.detail.value
                });
                break;
              case 'heartBitB':
                this.setData({
                  heartBitB : e.detail.value
                });
                break; 
              case 'afterHweight':
                var weigh2=e.detail.value;
                var weightH=this.data.weightBeforeHNum-weigh2;
                var overH=weightH-this.data.weight_toHNum;
                this.setData({
                  afterHweight : e.detail.value,
                  weightHNum: weightH.toFixed(1),
                  overHNum: overH.toFixed(1)
                });
                break; 
              case 'bloodPresssureHighA':
                  this.setData({
                    bloodPresssureHighA : e.detail.value
                  });
                  break;
              case 'bloodPressureLowA':
                  this.setData({
                    bloodPressureLowA : e.detail.value
                  });
                  break;
              case 'heartBitA':
                this.setData({
                  heartBitA: e.detail.value
                });
                break;
            }

      },


     //tabclick
     tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
    },
    

     // 切换是否带有登录态
     switchRequestMode: function (e) {
       this.setData({
         takeSession: e.detail.value
       })
       this.doRequest()
     },

     doRequest: function () {
       util.showBusy('请求中...')
       var that = this
       var options = {
         url: config.service.requestUrl,
         login: true,
         success(result) {
           util.showSuccess('请求成功完成')
           console.log('request success', result)
           that.setData({
             requestResult: JSON.stringify(result.data)
           })
         },
         fail(error) {
           util.showModel('请求失败', error);
           console.log('request fail', error);
         }
       }
       if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
         qcloud.request(options)
       } else {    // 使用 wx.request 则不带登录态
         wx.request(options)
       }
     },






    });

//calcuae the weight_toH number
function calWeightToH(lastWeight, newWeight, that){
  if(lastWeight==''||newWeight==''){
    return '';
  };
  var weight_toH=newWeight-lastWeight;
  return weight_toH;

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
};

//insert data to tHallData table 
function insertData(datas){
  return new Promise((resolve, reject)=>{
    wx.request({
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: `${config.service.inputSecondDataUrl}`,
      method: 'post',
      //data: allData,
      data: datas,
      login: true,
      success(result) {
        util.showSuccess2('请求成功完成')
        resolve( JSON.stringify(result.data))
        
      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    });
  })

}







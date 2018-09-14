//utils/pageContent.js
/*
    show the page content
*/

var inputDataOneShow = {
    text:{
      pageTitle: '透析上机数据',
      systemDate: '',
      userAccount: 'lala',
      inputValue: '',
      weight_lasttime: "上次下机体重",
      weight_lasttimeNum: "",
      beforeWeight: "本次上机体重",
      beforeWeightNum: '',
      weightToH: "体重增加",
      weightToHAdjust: "调整后透析量",
      weightToHNum: "20",
      bloodHigh: '血压高血压',
      bloodHighNum:'',
      bloodLow:'血压低血压',
      bloodLowNum:'',
      heartBit: '心跳',
      heartBitNum:'',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      kg: "(Kg)"

    }
};

var index = {
    data: {
      newuserWorning: '',
      bingLiBen: "综合症"
    }
};

var main= {
        data: {
          lastHDateText: '上次透析日期 ',
          lastHWeightText: '上次下机体重:  ',
          nextHDateText: "下次透析日期 ",
          nextHstartText: '上机状态: ',
          start: '已经开始透析',
          notStart: '未开始透析',
          submit: "submit",
          inputDataOneNew: '输入上机数据',
          inputDataTwoUpdate: '更新上机数据',
          inputDataTwo: "输入上机数据",
          queryData: "查询透析历史数据",
          listAllData: "list all old data"
        }
};

module.exports = {index, inputDataOneShow, main}
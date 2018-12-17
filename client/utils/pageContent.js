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
      analyzeWeight:"预计下机体重",
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
      kg: "(Kg)",
      updateButton:'更新数据',
      okButton: '返回上机',
      nextButton:'输入下机数据'

    }
};

var index = {
    data: {
      newuserWorning: '',
      bingLiBen: "肾病综合症（透析小本）",
      baoGaoSaoMiao:'检查报告扫描',
      healthCare:'康复保养记录',
      newUserText: '没有登陆',
      worningText: '请授权登录'
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
          inputDataOneNew: '输入上机透析数据',
          inputDataOneUpdate: '输入下机透析数据',
          inputDataTwo: "输入2上机透析数据",
          queryData: "查询透析历史数据",
          listAllData: "list all old data",
          nextHdateExist: '输入的下次透析日期已经存在',
          inputNewDate: '请重新选择'
        }
};

var inputDataOne={
    data:{
        pageDate: '透析上机日期',
        weight_lasttime: "上次下机体重",
        weight_lasttimeNum: '',
        beforeWeight: "此次上机前体重",
        weightToH: "需要透析体重",
        weightToHNum: "20",
        bloodHigh: '高血压',
        bloodHighNum: '140',
        bloodLow: '低血压',
        bloodLowNum: '90',
        heartBit: '心跳',
        heartBitNum: '70',
        next: '输入下机数据',
        saveNew:'输入上机数据',
        saveUpdate:'上机数据已经输入',
        summary:'展示上机数据给医生',
        noInputTitle: '数据未输入',
        noInputContent: '上机前体重'

    }
};

var inputDataTwo={
    data:{
        pageDate: '透析下机日期',
        weight_toH: '需要透析体重',
        afterWeight: '下机体重',
        weightH:'实际减少体重',
        OverH:'多透析的体重',
        bloodHighPressureAfter: '高血压',
        bloodLowPressureAfter: '低血压',
        heartBitAfter: '心跳',
        hDuration: 'duration of H',
        hasUserInfo: false,
        userAccount: 'lala',
        inputValue: '',
        saveNext: "Save and Next",
        save: "保存数据",
        noInputTitle: '数据未输入',
        noInputContent: '下机后体重'
    }
};

var queryList={
    data:{
        before:'上机',
        after:'下机',
        dataInput:'输入新数据',
        today: '今日日期',
        lastHDateText: '透析日期',
        weightBeforeH:'上机前体重',
        weight_toH: '需要透析重量',
        afterWeight: '下机后体重',
        weightH:'实际透析重量',
        OverH:'超透重量',
        hDuration: '透析用时',
        bloodHighPressureBefore:'高血压',
        bloodLowPressureBefore: '低血压',
        heartBitBefore:'心率',
        afterHWeight: '下机后体重',
        weightLastTime:'上次下机体重',
        adjuestWeight_toH:'调整后透析重量',
        bloodHighPressureAfter:'高血压',
        bloodLowPressureAfter:'低血压',
        heartBitAfter:'心率',
        nextHdateExist: '输入的下次透析日期已经存在',
        inputNewDate: '请重新选择'
    }
}

module.exports = {index, inputDataOneShow, main, inputDataOne, inputDataTwo ,queryList}
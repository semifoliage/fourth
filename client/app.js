//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    _nickName:'',
    _openid:'',
    _userInfo:{},
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})
//index.js
const app=getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var page = require('../../utils/pageContent.js')
var text=page.index.data;
var userData={};

Page({
    data: {
        userInfo: {},
        openId:'',
        logged: false,
        takeSession: false,
        requestResult: '',
        mainIconShow: true,
        list: text.bingLiBen
    },
    onLoad: function(options){
        wx.hideTabBar();
        var that =this;
        //
        //get stored info
        wx.getStorage({
              key: 'userRecords',
              success: function (res) {
                console.log(res);
                that.setData({
                    openId: res.data.data.openId,
                    userInfo: res.data,
                    logged: true
                    });
                app._userInfo=res.data;
                app.openId=res.data.data.openId;
                console.log('storage get done, the user info collected')

                //set MainIcon show
                setPageData(that, res)

                //show tabbar
                wx.showTabBar();
                 },
               fail: function(err){
                 console.log('storage userInfo can not be reload.  login is needed. ');
                 util.showModel('new user', 'login is required');


               }
              });
    },


    // 用户登录示例
    bindGetUserInfo: function (e) {
        if (this.data.logged) return

        util.showBusy('正在登录')

        //package userinfo 
        userData = e.detail;
        var that=this;
        const session = qcloud.Session.get()
        console.log(session)

        if (session) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
            console.log('second login session')
            var userSession ={
                nickName: session.data.nickName,
                codeName: session.data.codeName
            }
            //console.log(userSession)
            qcloud.requestUserId({
                data: userSession,
                success: res => {
                    var userAllInfo=Object.assign({}, e.detail.userInfo, res)
                    console.log('union the userInfo and userRecord')
                    console.log(userAllInfo)
                    this.setData({
                        userInfo: userAllInfo,
                        openId: userAllInfo.data.openId,
                        logged: true })
                    util.showSuccess('登录成功')
                    setStorage(userAllInfo, that);
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        } else {
            // 首次登录
            qcloud.login({
                data: e,
                success: res => {
                    console.log('set storage of user info')
                    var data =res;
                    data.openId= data.openid;
                    var result= {data}
                    var userAllInfo=Object.assign({}, e.detail.userInfo, result)
                    setStorage(userAllInfo, that)

                    console.log('login success and set page data ')
                    this.setData({
                        openId: userAllInfo.data.openId,
                        userInfo: userAllInfo,
                        logged: true
                        })
                    util.showSuccess('登录成功')
                },
                fail: err => {
                    console.error(err)
                    util.showModel('登录错误', err.message)
                }
            })
        }
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
            success (result) {
                util.showSuccess('请求成功完成')
                console.log('request success', result)
                that.setData({
                    requestResult: JSON.stringify(result.data)
                })
            },
            fail (error) {
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

    // 上传图片接口
    doUpload: function () {
        var that = this

        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function(res){
                util.showBusy('正在上传')
                var filePath = res.tempFilePaths[0]

                // 上传图片
                wx.uploadFile({
                    url: config.service.uploadUrl,
                    filePath: filePath,
                    name: 'file',

                    success: function(res){
                        util.showSuccess('上传图片成功')
                        console.log(res)
                        res = JSON.parse(res.data)
                        console.log(res)
                        that.setData({
                            imgUrl: res.data.imgUrl
                        })
                    },

                    fail: function(e) {
                        util.showModel('上传图片失败')
                    }
                })

            },
            fail: function(e) {
                console.error(e)
            }
        })
    },

    // 预览图片
    previewImg: function (e) {
        console.log('navigate to mainpage')
        var string='&openId='+this.data.openId
                    +'&nickName='+ this.data.userInfo.nickName
                    +'&userInfo='+ JSON.stringify(this.data.userInfo)
                    +'&codeName='+this.data.userInfo.data.codeName;
        wx.navigateTo({
                  url: '../main/main?title=Main Page'+string,
              })
    },

    // 切换信道的按钮
    switchChange: function (e) {
        var checked = e.detail.value

        if (checked) {
            this.openTunnel()
        } else {
            this.closeTunnel()
        }
    },

    openTunnel: function () {
        util.showBusy('信道连接中...')
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)

        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
            util.showSuccess('信道已连接')
            console.log('WebSocket 信道已连接')
            this.setData({ tunnelStatus: 'connected' })
        })

        tunnel.on('close', () => {
            util.showSuccess('信道已断开')
            console.log('WebSocket 信道已断开')
            this.setData({ tunnelStatus: 'closed' })
        })

        tunnel.on('reconnecting', () => {
            console.log('WebSocket 信道正在重连...')
            util.showBusy('正在重连')
        })

        tunnel.on('reconnect', () => {
            console.log('WebSocket 信道重连成功')
            util.showSuccess('重连成功')
        })

        tunnel.on('error', error => {
            util.showModel('信道发生错误', error)
            console.error('信道发生错误：', error)
        })

        // 监听自定义消息（服务器进行推送）
        tunnel.on('speak', speak => {
            util.showModel('信道消息', speak)
            console.log('收到说话消息：', speak)
        })

        // 打开信道
        tunnel.open()

        this.setData({ tunnelStatus: 'connecting' })
    },

    /**
     * 点击「发送消息」按钮，测试使用信道发送消息
     */
    sendMessage() {
        if (!this.data.tunnelStatus || !this.data.tunnelStatus === 'connected') return
        // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
        if (this.tunnel && this.tunnel.isActive()) {
            // 使用信道给服务器推送「speak」消息
            this.tunnel.emit('speak', {
                'word': 'I say something at ' + new Date(),
            });
        }
    },

    /**
     * 点击「关闭信道」按钮，关闭已经打开的信道
     */
    closeTunnel() {
        if (this.tunnel) {
            this.tunnel.close();
        }
        util.showBusy('信道连接中...')
        this.setData({ tunnelStatus: 'closed' })
    }
});

function setStorage (data, that){
    console.log('setStorage data')
    console.log(data)
    wx.setStorage({
                  key: 'userRecords',
                  data: data,
                  success: function (res) {
                    console.log('successfully story user info in storage ');
                    console.log(res);
                  }
                });
    app._userInfo=data;
    app._openId=data.data.openId;
    //set page data
    setPageData(that, data);
    //show tab
     wx.showTabBar();
};

function setPageData(that, data){
      /*
        data format is defined:
        data {
            code: _code,
            data: {
                openId: _openId,
                nickName: _nickName
            }
        }
      */
    that.setData({
                //openId: data.data.openId,
                //userInfo: data,
                logged: true,
                mainIconShow: false
                });

}

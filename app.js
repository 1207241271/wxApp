const toast = require('./utils/toast.js');
const api = require('./utils/api.js');
const AV = require('./libs/av-weapp-min.js');
const leancloudApi = require('./utils/leancloudApi');
AV.init({ 
 appId: '5wk8ccseci7lnss55xfxdgj9xn77hxg3rppsu16o83fydjjn', 
 appKey: 'yovqy5zy16og43zwew8i6qmtkp2y6r9b18zerha0fqi5dqsw', 
});
App({
    onLaunch: function(){
        console.log('onLaunch');
        var that = this;
        AV.User.loginWithWeapp().then(user =>{
          console.log(user);
          that.globalData.user = user.toJSON();
          leancloudApi.getBindIMEI({
            success:(res)=>{
              that.globalData.IMEI = res;
              wx.redirectTo({
                url:'/page/main/main'
              })
            },
            fail:(res)=>{
              wx.redirectTo({
                url:'/page/home'
              })
            }
          });
          wx.getUserInfo({
            success:function(res){
              console.log(res);
            }
          });
        });

    },
    onShow:function(){
        console.log('onShow')
    },
    onHide:function(){
        console.log('onHide')
    },
    globalData:{
        hasLogin:false,
        openid:null,
        IMEI:null,
        user:{},
    },
    getUserOpenId: function(callback) {
    var self = this
    console.log('getUser')
    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function(data) {
          wx.request({
              url:'https://test.xiaoan110.com/v1/weapp',
              method:'POST',
              data:{code:data.code},       
              success: function(res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function(err) {
          toast.showToast(res);
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  },
  gotoMainPage:function(){
    wx.redirectTo({
      url:'/page/main/main'
    })
  }
});

 

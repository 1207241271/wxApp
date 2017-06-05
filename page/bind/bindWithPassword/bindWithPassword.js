const api = require('../../../utils/api.js');
const AV = require('../../../libs/av-weapp-min.js');
const leancloudApi = require('../../../utils/leancloudApi.js');

Page({
    data:{},
    formSubmit(e){
		console.log(e.detail.value);
		const username = e.detail.value.username;
		const password = e.detail.value.password;
        console.log(username);
        console.log(password);
        AV.User.logIn(username,password).then(user => {
            console.log(user);
            user.linkWithWeapp();
            leancloudApi.getBindIMEI({
                success:(res)=>{
                    getApp().globalData.IMEI = res;
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
        }).catch(console.error);
	},
})
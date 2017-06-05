const api = require('../utils/api.js');
const AV = require('../libs/av-weapp-min.js');
Page({
    data:{

    },
    onLoad(){
        console.log('pnalo');
        var that = this;

        // var app = getApp();
        // app.getUserOpenId((error,openId)=>{
        //     if(openId != null){
        //         api.getWeChartBindIMEI({
        //             openid:openId,
        //             success:(res)=>{
        //                 app.globalData.IMEI = res.data.imei;
        //                 that.gotoMain();
        //                 console.log(res);
        //             },
        //             fail:(res)=>{
        //                 that.gotoBind();
        //                 console.log(res);
        //             }
        //         });
        //      }else{
        //         that.gotoBind();
        //     }
        // });
        const user = AV.User.current();
        if(user != null){
            console.log(user);
            const mobilePhoneVerified = user.attributes.mobilePhoneVerified;
            if(mobilePhoneVerified){

            }
            console.log(mobilePhoneVerified);
        }
    },
    gotoMain(){
        wx.redirectTo({
            url:'./main/main',
            success:(res)=>{
                console.log(res);
            },
            fail:(res)=>{
                console.log(res);
            }
        })
    },
    gotoBind(){
        wx.redirectTo({
            url:'./bind/bindDevice/bindDevice',
            success:(res)=>{
                console.log(res);
            },
            fail:(res)=>{
                console.log(res);
            }
        })
    },
    gotoHaveId(){
        wx.redirectTo({
            url:'./bind/bindWithPassword/bindWithPassword',
            success:(res)=>{
                console.log(res);
            },
            fail:(res)=>{
                console.log(res);
            }
        })
    },
    gotoSetPhone(){
        wx.redirectTo({
            url:'./bind/bindSetPhone/bindSetPhone',
            success:(res)=>{
                console.log(res);
            },
            fail:(res)=>{
                console.log(res);
            }
        })
    }
});

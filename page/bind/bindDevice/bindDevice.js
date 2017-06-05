const api = require('../../../utils/api.js');
const app = require('../../../app.js');
const leancloudApi = require('../../../utils/leancloudApi.js');
const toast = require('../../../utils/toast');
Page({
    data:{},
    gotoScanIMEI(){
        wx.scanCode({
            sucess:(res) =>{
                console.log('success');
                console.log(res);
            },
            fail:(res) =>{
                console.log('fail');
                console.log(res);
            },
            complete:(res) => {
                console.log('complete');
                if(res.result!=null){
                    const result = JSON.parse(res.result);
                    console.log(result.IMEI)
                    if(result.IMEI != null){
                        leancloudApi.bindIMEI({
                            IMEI:result.IMEI,
                            success:(res)=>{
                                console.log('success');
                                toast.showToast('绑定成功');
                            },
                            fail:(res)=>{
                                console.log('fial');
                                toast.showToast(res);
                            }
                        });
                    }
                }
            }
        });
    },
    gotoInputIMEI(){
        wx.redirectTo({
            url:'./inputIMEI',
            sucess:(res)=>{
                console.log(res);
            },
        })
    }
});
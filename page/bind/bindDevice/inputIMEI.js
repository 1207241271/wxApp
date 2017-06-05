const api = require('../../../utils/api.js');
const app = require('../../../app.js');
const leancloudApi = require('../../../utils/leancloudApi.js');
const toast = require('../../../utils/toast');

Page({
    data:{},
   formSubmit(e){
       console.log(e.detail.value.IMEI);
       const IMEI = e.detail.value.IMEI;
       if(IMEI.length != 15){
       		toast.showToast('设备号长度不正确');
               return;
       }
       leancloudApi.bindIMEI({
                            IMEI:IMEI,
                            success:(res)=>{
                                toast.showToast('绑定成功');
                            },
                            fail:(res)=>{
                                toast.showToast(res);
                            }
                        });
   } 
});
const AV = require('../../../libs/av-weapp-min.js');

Page({
    data:{

    },
    PhoneFormSubmit(e){
        console.log(e.detail.value);
        const phoneNum = e.detail.value.phoneNum;
        if(phoneNum.length != 11){
       		toast.showToast('电话号码长度不正确');
        }
        var user = AV.User.current();
        user.setMobilePhoneNumber(phoneNum);
        user.save().then(user => {
            return AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber());
        }).catch(console.error);
     },
     VerifyFormSubmit(e){
         console.log(e.detail.value);
         const code = e.detail.value.verifyNum;
         AV.User.verifyMobilePhone(code).then( result =>{
             console.log(result);
         }).catch(console.error);
     }
});
const AV = require('../libs/av-weapp-min.js');
const BindingClass = require('../model/binding');
const Binding = 'Bindings';
const DID = 'DID';

const bindIMEI = (params) => {
    const IMEI = params.IMEI;
    new AV.Query(DID)
        .equalTo('IMEI',IMEI)
        .find()
        .then(didResults =>{
            console.log(didResults.length);
            if(didResults.length>0){
                const device = didResults[0];
                console.log('-bindIMEI  --have Device')
                //Bindings表
                new AV.Query(Binding)
                    .equalTo('IMEI',IMEI)
                    .find()
                    .then(results => {
                        console.log('-bindIMEI  --have bind result')
                       if(results.length>0){
                            console.log('-bindIMEI  --has binded')
                            params.fail('该设备已被绑定');
                            // return;
                       }
                       console.log('-bindIMEI  -- to bind')
                       new BindingClass({
                           IMEI:IMEI,
                           user:AV.User.current(),
                           device:device,
                       }).save().then((binding)=>{
                           console.log('-bindIMEI  --bind success')
                           params.success();
                           getApp().globalData.IMEI = IMEI;
                           getApp().gotoMainPage();
                       }).catch(console.error);
                    })
            }else{
                params.fail('该设备不存在');
            }
        });
}

function getBindIMEI (params){
    new AV.Query(Binding)
        .equalTo('user',AV.User.current())
        .find()
        .then(results => {
            console.log(results);
            if(results.length > 0){
                const bindData = results[0];
                params.success(bindData.IMEI);
            }else{
                params.fail();
            }
        })
}

module.exports = {
    bindIMEI,
    getBindIMEI,
}
const api = require('../../utils/api.js');
const app = require('../../app.js')
Page({
	data:{},
	onReady(){
		
	},
	finishInput(e){
		console.log(e.detail.value);
		const IMEI = e.detail.value;
		this.checkIMEI(IMEI);
	},
	formSubmit(e){
		console.log(e.detail.value);
		const IMEI = e.detail.value.IMEI;
		this.checkIMEI(IMEI);
	},
	checkIMEI(IMEI){
		console.log(IMEI.length);
		if(IMEI.length != 15){
			console.log('error');
		}else{
			console.log('success');
			// new AV.Query("DID")
			// .equalTo('IMEI',IMEI)
			// .find()
			// .then((did)=>{
			// 	console.log(did);
			// }).catch(error=>console.log(error.message));865067024846704
			console.log(getApp());
			var app = getApp();
			app.globalData.IMEI = IMEI;
			console.log(app.globalData.IMEI);
			api.setWeChatBind({
				data:{
					imei:IMEI,
					openid:app.globalData.openid,
				},
				method:'POST',
				success:(res)=>{
					console.log(res);
				}
			});
			wx.redirectTo({
				url:'../main/main',
				success:(res)=>{
					console.log(res);
				},
				fail:(res)=>{
					console.log(res);
				}
			})
		}
		
	},
});
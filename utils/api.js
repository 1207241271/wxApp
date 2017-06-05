const apiURL = 'https://api.xiaoan110.com';
const deviceURLAppend = '/v1/device';
const deviceParam = require('./deviceParams.js');
const DeviceCmd = {
	GET_Status:0,
	GET_GPS:1,
	SET_Autolock:2,
	GET_Autolock:3,
	SET_FenceSwitch:4,
	GET_FenceSwitch:5,
	GET_Battery:6,
	SET_BatteryType:7,
	START_Record:8,
	END_Record:9,
	ADD_BluetoothIMEI:10,
	SET_ServerAd:11,
	SET_UploadAudio:12,
	SET_BluetoothSwitch:13,
	SET_AudioAlarm:14,
	SET_ElectronicSwitch:15,
	GET_GPSSignal:17,
	GET_GSMSignal:18,
	SET_Relevance:22,
	GET_Relevance:23,
	GET_ElectronicSwitch:24,
	SET_MotorRelevance:25,
	GET_MotorRelevance:26,
	SET_BackWheelLock:28,
	SET_BackseatLock:29,
};

const wxRequest = (params, url) =>{
	wx.request({
		url,
		method: params.method || 'GET',
		data: params.data || {},
		header: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		success(res){
			if (params.success) {
				params.success(res);
			}
		},
		fail(res){
			if (params.fail) {
				params.fail(res);
			}
		},
		complete(res){
			if (params.complete) {
				params.complete(res);
			}
		},
	});
};

const getDeviceStatus = (params) =>{
    params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.GET_Status,params.param);
    console.log(params);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
};

const getGPS = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.GET_GPS.params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setDeviceFence = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.SET_FenceSwitch,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getDeviceFence = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.GET_FenceSwitch,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setBatteryType = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.SET_BatteryType,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setRecordStart = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.START_Record,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setRecordEnd = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.END_Record,params.param);
	wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setElectronicSwitch = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.SET_ElectronicSwitch,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getElectronicSwitch = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.GET_ElectronicSwitch,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getGPSSignal = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.GET_GPSSignal,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getGSMSignal = (params) =>{
	params.data = deviceParam.formateParams(params.IMEI,DeviceCmd.GET_GSMSignal,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setRelevance = (params) =>{
	params.data = deviceParam.formateParams(params.param,DeviceCmd.SET_Relevance,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getRelevance = (params) =>{
	params.data = deviceParam.formateParams(params.param,DeviceCmd.GET_FenceSwitch,params.param);
	wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setMotorRelevance = (params) =>{
	params.data = deviceParam.formateParams(params.param,DeviceCmd.SET_MotorRelevance,params.param);
	wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getMotorRelevance = (params) =>{
	params.data = deviceParam.formateParams(params.param,DeviceCmd.GET_MotorRelevance,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setBackWheelLock = (params) =>{
	params.data = deviceParam.formateParams(params.param,DeviceCmd.SET_BackWheelLock,params,param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const setBackseatLock = (params) =>{
	params.data = deviceParam.formateParams(params.param,DeviceCmd.setBackseatLock,params.param);
    wxRequest(params,`${apiURL}${deviceURLAppend}`);
}

const getItinerary = (params) =>{
	wxRequest(params,`${apiURL}/v1/itinerary/${params.IMEI}`);
}


const setWeChatBind = (params) =>{
	console.log(params);
	wxRequest(params,'https://test.xiaoan110.com/v1/imei2wechat');
}
const getWeChartBindIMEI = (params)=>{
	console.log(`https://test.xiaoan110.com/v1/imei2wechat/${params.openid}`);
	wxRequest(params,`https://test.xiaoan110.com/v1/imei2wechat/${params.openid}`);
}
module.exports = {
	getDeviceStatus,
	getGPS,
	setDeviceFence,
	getDeviceFence,
	setBatteryType,
	setRecordStart,
	setRecordEnd,
	setElectronicSwitch,
	getElectronicSwitch,
	getGPSSignal,
	getGSMSignal,
	setRelevance,
	getRelevance,
	setMotorRelevance,
	getMotorRelevance,
	setBackWheelLock,
	setBackseatLock,
	getItinerary,
	setWeChatBind,
	getWeChartBindIMEI
};

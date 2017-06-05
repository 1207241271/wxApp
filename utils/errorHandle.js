function handleErrorCode(errorCode){
	var errorStr = '';
	switch(errorCode){
		 case 100:
                errorStr = "服务器内部错误!";
                break;
            case 101:
            case 102:
            case 103:
            case 104:
                errorStr = "操作内容错误";
                break;
            case 106:
            case 107:
            case 108:
                errorStr = "暂无响应，请稍后重试";
                break;
            case 109:
                errorStr = "设备不在线";
                break;
            case 111:
                errorStr = "设备不支持该操作";
                break;
	}
	wx.showToast({
		title:errorStr,
		icon:'success',
		duration:2000
	})
};



module.exports = {
	handleErrorCode,
};
function formateParams(IMEI,code,otherParams){
	var cmdParam = {};
	cmdParam.c = code;
	if (otherParams != null) {
		cmdParam.param = otherParams;
	}
	var result = {"imei":IMEI,"cmd":cmdParam};
	return result;
};

module.exports = {
	formateParams,
};
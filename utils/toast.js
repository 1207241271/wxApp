function showToast(string){
	wx.showToast({
		title:string,
		icon:'fail',
		duration:2000
	})
};



module.exports = {
	showToast,
};
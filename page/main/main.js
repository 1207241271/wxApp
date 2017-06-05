const api = require('../../utils/api.js');
const errorHandle = require('../../utils/errorHandle.js');
const gpsConvert = require('../../utils/gpsConvert.js');
const bmap = require('../../libs/bmap-wx/bmap-wx.min.js');
const IconPath = "../../image/marker.png";
Page({
    data: {
        longitude: 116.487847,
        latitude: 40.002607,
        placeName:'正在加载',
      markers:[{
          iconPath:IconPath,
          id: 0,
          latitude: 40.002607,
          longitude: 116.487847,
          width: 36,
          height: 57,
      }],
      IMEI:null,
      battery:'--',
      itinerary:'--',
      isOnline:1,
      GSMLevel:0,
      isGPSSignal:0,
      isSwitchOn:1,
      bdak:'AYKv4NVCeMLG5bdtwPIHLtRhwinDEHEV'
    },
    onReady() {
      var that = this;
      that.setData({
        IMEI:getApp().globalData.IMEI
      });
      console.log(that.data.IMEI)
      console.log('refresh');
      this.refresh();
    },
    refresh(){
      console.log('isRefreshing');
      this.getGSMSignal();
      this.getDeviceStatus();
      this.getItinerary();
    },
    getDeviceStatus(){
        var that = this;
        api.getDeviceStatus({
        IMEI:that.data.IMEI,
        method : 'POST',
        success: (res) => {
          wx.showToast({
            title:'查询成功',
            icon:'success',
            duration:1500
          })
          console.log('-----status-----')
          console.log(res);
          const data = res.data;
          if (data.code == 0) {
            const result = data.result;
            const batteryParam = result.battery;
            const percent = batteryParam.percent;
            const isOnlineValue = 1;
            const isSwitchOnValue = result.defend;
            const isGPSSignalValue = (result.gps == null?0:1);
            that.setData({
              battery:percent,
              isGPSSignal:isGPSSignalValue,
              isOnline:isOnlineValue,
              isSwitchOn:isSwitchOnValue
            });
            if (result.gps!= null) {
              that.setLocation(result.gps);
            }
          }else{
            if (data.code == 109) {
              that.setData({
                isOnline:0
              })
            }
            errorHandle.handleErrorCode(data.code);
          }
        },
        fail:(res) => {
          console.log(res);
        }
      });
      wx.showToast({
        title:'正在查询',
        icon:'loading',
        duration:3000
      })
    },
    setLocation(gps){
      var that = this;
      console.log('-----gps-----')
      console.log(gps);
      const LngLat =  gpsConvert.wgs84togcj02(gps.lng,gps.lat);
      const newlatitude = LngLat[1];
      const newlongitude = LngLat[0];
      var newMarker = that.data.markers[0];
      newMarker.latitude = LngLat[1];
      newMarker.longitude = LngLat[0];
      var newMarkers = new Array(newMarker);
      that.setData({
        latitude:newlatitude,
        longitude:newlongitude,
        markers:newMarkers
      });
      var BMap = new bmap.BMapWX({ak:that.data.bdak});
      var BMapLocation = LngLat[1]+","+LngLat[0];
      console.log(BMapLocation);
      BMap.regeocoding({
          iconPath:IconPath,
          coordtype:'gcj02ll',
          location:BMapLocation,
          success:(data) =>{
            console.log('-----location-----');
            console.log(data);
            const addressComp = data.originalData.result.addressComponent;
            var place = addressComp.city+addressComp.district+addressComp.street;
            that.setData({
              placeName:place,
            })
          },
          fail:(data) =>{
            console.log(data);
          }
      });   
  },
    setSwitch(){
      var that = this;
      var param = {};
      if (that.data.isSwitchOn) {
        param.defend = 0;
      }else{
        param.defend = 1;
      }
      api.setDeviceFence({
        IMEI:that.data.IMEI,
        param:param,
        method : 'POST',
        success:(res) =>{
           wx.showToast({
            title:'设置成功',
            icon:'success',
            duration:1500
          })
          console.log('-----switch-----')
          console.log(res);
          const data = res.data;
          var code = data.code;
          if (code == 0) {
            that.setData({
              isSwitchOn:1-this.data.isSwitchOn,
            });
          }else{
            errorHandle.handleErrorCode(code);
          }
        },
      });
      wx.showToast({
        title:'正在设置',
        icon:'loading',
        duration:3000
      })
    },
    getGSMSignal(){
      var that = this;
      api.getGSMSignal({
        IMEI:that.data.IMEI,
        method : 'POST',
        success:(res) =>{
          console.log('-----GSM-----')
          console.log(res);
          const data = res.data;
          const code = data.code;
          if (code == 0) {
            const result = data.result;
            const GSMSignal = result.GSMSignal;
            var GSMLevelValue = 0;
            if(GSMSignal < 6 && GSMSignal > 3){
              GSMLevelValue = 1;
            }else if (GSMSignal < 9) {
              GSMLevelValue = 2;
            }else if (GSMSignal < 11) {
              GSMLevelValue = 3;
            }else{
              GSMLevelValue = 4;
            }
            that.setData({
              GSMLevel:GSMLevelValue
            })
          }else{
            errorHandle.handleErrorCode(code);
          }
        }
      })
    },
    getItinerary(){
      var that = this;
      api.getItinerary({
        IMEI:that.data.IMEI,
        success:(res) =>{
          console.log('-----itinerary-----')
          console.log(res.data);
          const itinerarys = res.data.itinerary;
          if(itinerarys != null){
            const itinerary = itinerarys[0];
            const miles = (itinerary.miles/1000).toFixed(1);
            that.setData({
              itinerary:miles
            })
          }
        }
      });
    },

})
<template>
  <div>
    <map
      id="map"
      :longitude="longitude"
      :latitude="latitude"
      scale="14"
      bindmarkertap="markertap"
      show-location
    ></map>
    <h1>我的地址: {{address}}</h1>

    <div class="imgphoto" @click="gotophoto()">
      <img src="../../../static/images/photo1.png" alt />
    </div>
  </div>
</template>
 
<script>
import store from "../store";
export default {
  data() {
    return {
      longitude: 113.32452,
      latitude: 23.099994,
      name: ""
    };
  },

  computed: {
    address() {
      return store.state.address;
    }
  },
  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    },
    gotophoto() {
      mpvue.navigateTo({ url: "/pages/counter/main" });
    }
  },

  created() {
    // let app = getApp()
    mpvue.getLocation({
      type: "wgs84",
      success: res => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        this.latitude = latitude;
        this.longitude = longitude;
        console.log("location", res);
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: "http://apis.map.qq.com/ws/geocoder/v1/",
          data: {
            key: "WJBBZ-2NZ3F-VOKJU-NC6PL-VU5FF-PZF2R",
            location: locationString
          },
          method: "GET",
          success: function(r) {
            console.log(r);
            //输出一下位置信息
            console.log("用户位置信息", r.data.result.address);
            store.commit("meaddress", r.data.result.address);
            //r.data.result.address获得的就是用户的位置信息，将它保存到一个全局变量上
            getApp().globalData.locationInfo = r.data.result.address;

            //这步是将位置信息保存到本地缓存中，key = value的形式
            try {
              mpvue.setStorageSync("locationInfo", r.data.result.address);
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    });
  }
};
</script>
 
<style scoped>
#map {
  width: 100%;
  height: 95vh;
}
.imgphoto {
  width: 100rpx;
  height: 100rpx;
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  z-index: 9999;
}
.imgphoto img {
  width: 100%;
  height: 100%;
}
</style>

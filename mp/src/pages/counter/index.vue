<template>
  <div class="photo">
    <textarea placeholder="这一刻的想法...." class="shuoshuo"  v-model="value"></textarea>

    <div class="imgii">
      <img class="imgOne" :src="img" alt />
      <img src alt />
    </div>

    
    <div class="imgphoto" @click="todophoto">
      <img src="../../../static/images/photo1.png" alt />
    </div>

    <van-button class="butt"  round  type="primary"  @click="godoshuoshuo">{{butt}}</van-button>

    <div class="weizhi">
        <img class="tupian" src="../../../static/images/weizhi.png" alt />
        <span class="address">{{address}}</span>
    </div>

  </div>
</template>


<script>
// Use Vuex
import store from "../store";

export default {
  data() {
    return {
      img: "",
      value:null,
      address: "你在哪?",
      butt:"发 送"
    };
  },
  mounted(){
    
  },
  methods: {
    todophoto() {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          this.img = tempFilePaths;
          this.address = mpvue.getStorageSync("locationInfo");
        }
      });
    },
    //去发说说
    godoshuoshuo(){

    }

  }
};
</script>

<style>
.photo {
  width: 95%;
  height: 100vh;
  /* background-color: #f0f0f0; */
  margin: 0 auto;
  position: relative;
}
.shuoshuo {
  width: 100%;
  min-height: 100rpx;
}

.imgOne {
  width: 350rpx;
  height: 300rpx;
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
.tupian {
  width: 40rpx;
  height: 100%;
}
.weizhi {
  width: 250rpx;
  height: 45rpx;
  border-radius: 30rpx;
  padding: 10rpx;
  position: absolute;
  z-index: 999;
  bottom: 20rpx;
}

.address {
  position: absolute;
  top: 15rpx;
  left: 45rpx;
  margin-left: 20rpx;
  color: #333;
  font-size: 28rpx;
  width: 200rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.butt{
  position: absolute;
  bottom: 20rpx;
  right:0;
}
</style>

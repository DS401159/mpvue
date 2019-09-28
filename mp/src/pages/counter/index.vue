<template>
  <!-- <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
  </p>-->
  <div class="photo">
    <textarea placeholder="分享新鲜事..." class="shuoshuo"  v-model="value"></textarea>

    <div class="imgii">
      <img class="imgOne" :src="img" alt />
      <img src alt />
    </div>

    
    <div class="imgphoto" @click="todophoto">
      <img src="../../../static/images/photo.png" alt />
    </div>
    <van-button class="butt" plain round  type="primary">发送</van-button>
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
      address: "你在哪?"
    };
  },
  mounted(){
    
  },
  methods: {
    // increment () {
    //   store.commit('increment')
    // },
    // decrement () {
    //   store.commit('decrement')
    // }
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
   console.log(this.value)
        }
      });
    },

  }
};
</script>

<style>
.photo {
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20rpx;
}
.shuoshuo {
  width: 100%;
  min-height: 100rpx;
}

.imgOne {
  width: 300rpx;
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
  padding: 15rpx;
  border: #999 solid 2rpx;
  background-color: #edece8;
  position: relative;
  left: 20rpx;
  z-index: 999;



}

.address {
  /* font-size: 18rpx; */
  position: absolute;
  top: 20rpx;
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
  right: 20rpx;
}
</style>

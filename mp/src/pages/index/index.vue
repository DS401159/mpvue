<template>
  <div>
      <Swiper></Swiper>
      <div class="photo">
          <div>浏览262</div>
          <div>照片24</div>
          <div class="takephoto">拍照</div>
      </div>

<<<<<<< HEAD
=======

>>>>>>> 7427d6e4392a24b669250192d8bb87d3ba56ed1e
      <div class="content">
        <div class="nav">
          <div>按时间</div>
          <div>按人气</div>
          <div>按距离</div>
        </div>
        <Theme></Theme>
        <Theme></Theme>
      </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import Swiper from '../../components/swiper.vue'
import Theme from '../../components/theme.vue'
=======

import Swiper from '../../components/swiper.vue'
import Theme from '../../components/theme.vue'


>>>>>>> 7427d6e4392a24b669250192d8bb87d3ba56ed1e
export default {
  data () {
    return {
      
    }
  },
  components: {
    Swiper,
    Theme
  },

  methods: {
    
  },
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
    }
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
  .photo{
    display: flex;
    justify-content: space-around;
    height: 120rpx;
    align-items: center
  }
  .takephoto{
    width: 160rpx;
    margin-left: 70rpx;
    text-align: center;
    line-height: 60rpx;
    height: 60rpx;
    border-radius:100rpx; 
    background:blue;
    color:white
  }
  .content{
     background: #eee;
     padding: 0rpx 20rpx 20rpx
  }
  .nav{
    width: 60%;
    height: 100rpx;
    padding: 0rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
   
  }

</style>

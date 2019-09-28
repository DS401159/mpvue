<template>
  <div>
      <Swiper></Swiper>
      <div class="photo">
          <div>浏览262</div>
          <div>照片24</div>
          <div class="takephoto">拍照</div>
      </div>
<<<<<<< 1414ebd54fedfa0f138ae9cede70d832b1bab067
      <div class="content">
        <div class="nav">
          <div>按时间</div>
          <div>按人气</div>
          <div>按距离</div>
=======
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
>>>>>>> he
        </div>
        <Theme></Theme>
        <Theme></Theme>
      </div>
  </div>
</template>

<script>
<<<<<<< 1414ebd54fedfa0f138ae9cede70d832b1bab067

import Swiper from '../../components/swiper.vue'
import Theme from '../../components/theme.vue'
=======
import card from '@/components/card'
>>>>>>> he
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

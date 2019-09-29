<template>
    <swiper v-if="imgUrls.length > 0" indidator-dots="imgUrls.length > 1" :autoplay='play' circular='play'>
      <block v-for="(item, index) in imgUrls" :key="index" >
        <swiper-item>
          <image :src="item" mode="scaleToFill" class="banner"></image>
        </swiper-item>
      </block>
    </swiper>
</template>
<script>
export default {
    data(){
        return{
            imgUrls:[
                "../../static/images/pic1.png",
                "../../static/images/pic2.png",
                "../../static/images/pic2.png",
                "../../static/images/pic2.png",
            ],
            play:true
        }
    },
    methods:{
    }
}
</script>
<style  scoped>
    .banner{
        width: 100%;
    }
    swiper{
        height: 480rpx;
    }
</style>
<template>
    <div class="box">
        <div class="content" >
            <div class="top">
                <img src= "../../static/images/pic1.png" alt="">
                <div class="left">
                    <p class="name">呵呵</p>
                    <p class="time">2019-12</p>
                    <div class="del" >
                        <img src="../../static/icon/lj.png" alt="" @click="deltheme()">
                    </div>
                </div>
            </div>
            <img src= "../../static/images/pic1.png" alt="" class="addimg">
            <div class="icon">
                <button open-type='share'> <img src="../../static/icon/fx.png" alt="" > </button>
                <div @click="dian()">
                    <img :src="dianzan" alt="">
                    <span>{{count}}</span>
                </div>
                <img :src="shoucang" alt="" @click="shou()">
                <img src="../../static/icon/yj.png" alt="" @click="tocomment()">
            </div>
            <ul>
                <li>
                    <img src="../../static/icon/dz.png" alt="">
                    <div class="address">武汉市江夏区金融港</div>
                    <div class="right">
                        <a href="">地点周边</a>
                        <a href="">导航</a>
                    </div>
                </li>
                <li>
                    <img src="../../static/icon/suo.png" alt="">
                    <div>坐标</div>
                </li>
                <li>
                    <img src="../../static/icon/sj.png" alt="">
                    <div>时间</div>
                </li>
                <li class="word">
                    <img src="../../static/icon/sj.png" alt="">
                    <div>时间</div>
                </li>
            </ul>

        </div>
    </div>
</template>
<script>

import  {http} from '../utils/ajax'
export default {
    data(){
        return{
            dianzan:"../../static/icon/dzan.png",
            shoucang:'../../static/icon/sc.png',
            count:0,
            isShow:false
        }
    },
    methods:{
        dian(){
            if(this.dianzan=="../../static/icon/dzan.png"){
                this.dianzan="../../static/icon/dzan-on.png"
                this.count+=1
            }else{
                this.dianzan="../../static/icon/dzan.png"
                this.count-=1
            }
        },
        shou(){
            if(this.shoucang=="../../static/icon/sc.png"){
                this.shoucang="../../static/icon/sc-on.png"
            }else{
                this.shoucang="../../static/icon/sc.png"
            }
        },
        tocomment(){
            mpvue.navigateTo({
                url:'../comment/main'
            })
        },
        deltheme(){
            http({
                url:'https://xiaoshunshun.cn:1901/vue/deltheme',
                method:"POST",
                data:{
                    // _id:
                },
                success:()=>{
                    
                }
            })
        }
    },    
    mounted(){
        http({
            url:'https://xiaoshunshun.cn:1901/vue/deltheme',
            method:'POST',
            success:()=>{

            }
        })
    }

}
</script>

<style scoped>
    .box{
        margin-bottom: 40rpx
    }
    .content{
        background: #fff;
    }
    .top{
        width: 100%;
        display: flex;
        padding: 15rpx 30rpx;
        justify-content: space-between;
        align-items: center
    }
    .top img{
        width: 11%;
        height: 79rpx;
        border-radius: 50%
    }
    .top .left{
        width: 86%;
        margin-left: 0.1rpx;
        line-height: 40rpx;
        position: relative;
    }
    .top .left .del{
        width: 50rpx;
        height: 50rpx;
        color: red;
        position:absolute;
        right: 80rpx;
        top: 20rpx
    }
    .top .left .del img{
        width: 100%;
        height: 100%;
    }
    .top div .time{
        color: #888
    }
    .addimg{
        width:100%;
        height: 800rpx;
    }
    .icon{
        width: 100%;
        display: flex;
        height: 100rpx;
        justify-content: space-around;
        border-bottom: 2rpx solid #ddd
    }
    .icon img{
        margin-top: 25rpx;
        width: 50rpx;
        height: 50rpx;
    }
    ul{
        list-style: none;
        border-bottom:2rpx solid #ddd
    }
    ul li{
        display: flex;
        position: relative;
        align-items: center;
        height: 50rpx;
        font-size: 24rpx
    }
    ul li img{
        margin:25rpx 30rpx;
        width: 30rpx;
        height: 30rpx;
    }
    ul li .address{
         width: 50%;

     }
     ul .word{
         border-top:2rpx solid #ddd
     }
    ul li .right{
        display: flex;
        width: 230rpx;
        justify-content: space-between;
        position: absolute;
        right: 50rpx;    
    }
    ul li .right a{
        color:blue
    }
    button{
        border: none;
        background:none;
        padding: 0rpx;
        margin: 0rpx
    }
    button::after{
        border: none!important
    }
</style>
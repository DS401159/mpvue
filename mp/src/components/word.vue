<template>
    <div class="box">
        <h3>全部评论 ({{this.comments.length}}条)</h3>
        <div class="content" v-for='(comment,i) in comments' :key='i'> 
            <div class="top">
                <img :src="comment.avatar" alt="">
                <div class="left">
                    <p class="name">{{comment.username}}</p>
                    <p class="time">第{{i+1}}楼 {{comment.time}}</p>
                    <div class="del" v-if="comment.username==username" @click="del(comment._id)">删除</div>
                </div>
            </div>
            <p class="word">
               {{comment.word}}
            </p>
        </div> 
    </div>
</template>
<script>
import { Toast } from 'vant'
export default {
    data(){
        return{
            comments:[],
            username:JSON.parse(sessionStorage.userinfo).username
        }
    },
    methods:{
        del(data){
            this.$axios.post('/vue/delcomment',{_id:data}).then(result=>{
                Toast(result.data.msg)
            })
        }
    },
    props:['id'],
    mounted(){
        this.$axios.get('/vue/getcomment',{params:{themeid:this.id}}).then(result=>{
            this.comments =result.data.result
        })
    },
    updated(){
        this.$axios.get('/vue/getcomment',{params:{themeid:this.id}}).then(result=>{
            this.comments =result.data.result
        })
    }
}
</script>

<style scoped>
    .box{
        margin-bottom: 1rem
    }
    .content{
        margin-top: 0.2rem;
        background: #fff;
        padding-bottom:0.3rem; 
        margin-bottom: 0.2rem;
    }
    .top{
        width: 100%;
        display: flex;
        padding: 0.2rem;
        justify-content: space-between;
        align-items: center
    }
    .top img{
        width: 11%;
        height: 0.76rem;
        border-radius: 50%
    }
    .top .left{
        width: 86%;
        margin-left: 0.1rem;
        line-height: 0.4rem;
        font-size: 0.32rem;
        font-weight: bold;
        position: relative;
    }
    .top .left .del{
        width: 15%;
        color: red;
        position:absolute;
        right: 0rem;
        top: 0rem
    }
    .top div .time{
        font-size: 0.28rem;
        color: #888
    }
    .word{
        text-indent: 0.6rem;
        padding:0 0.2rem 
    }
    h3{
        font-size: 0.4rem;
        text-indent: 0.3rem;
        margin-top: 0.4rem
    }
</style>
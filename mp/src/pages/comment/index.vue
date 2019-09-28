<template>
    <div>
        <div class="content">
            <div class="top">
                <img src="../../static/images/pic1.png" alt="">
                <div>
                    <p class="name">111</p>
                    <p class="time">11</p>
                </div>
            </div>
            <p class="word">
               <!-- {{theme.word}} -->111
            </p>
            <img src="../../static/images/pic1.png" alt="" class="addimg">
        </div>  
        <!-- <Word :id='id'></Word>
        <Comment :id='id'></Comment> -->
    </div>
</template>

<script>
import Word from '@/components/Word'
import Comment from '@/components/Comment'

export default {
    data(){
        return{
            show:true,
            theme:{},
            id:this.$route.query._id,
            login1:true
        }
    },
    components:{
        Word,
        Comment
    },
    mounted(){
        this.$axios.get('/vue/gettheme',{params:{_id:this.id}}).then(result=>{
            this.theme=result.data.result[0]
        })
    },
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
    .top div{
        width: 86%;
        margin-left: 0.1rem;
        line-height: 0.4rem;
        font-size: 0.32rem;
        font-weight: bold
    }
    .top div .time{
        font-size: 0.28rem;
        color: #888
    }
    .word{
        text-indent: 0.6rem;
        padding:0 0.2rem 
    }
    .addimg{
        width:80%;
        height: auto;
        margin: 0.2rem 0.2rem 0.2rem 10%;
    }
</style>
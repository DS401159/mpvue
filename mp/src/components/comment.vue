<template>
    <div>
        <div class="foot" v-if='show'>
            <div class="button" @click="comment">我也来说两句</div>
        </div>
        <div class="box" v-else @click.stop="hiden()">
            <div class="foot" @click.stop="comment()">
                <textarea name="" id="" cols="30" rows="3" v-model="word" placeholder="我也来说两句..."></textarea>
                <div class="push" @click.stop='push'>发表</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../store'
import {http} from '../utils/ajax'
export default {
    data(){
        return{
            word:'',
            show:true,
            comments
        }
    },
    props:['id'],
    computed:{
        avatar(){
            return  store.state.avatar
        }
    },

    methods:{
        comment(){
            this.show=false
        },
        hiden(){
            this.show=true
        },
        push(){
            var themeid=this.id
            var username=JSON.parse(sessionStorage.userinfo).username
            var word=this.word
            var time=new Date()
            var month=time.getMonth()+1
            var day=time.getDate()
            var time=`${month}-${day}`
            var avatar=this.avatar
            if(word){
                // this.$axios.post('/vue/setcomment',{themeid,username,word,time,avatar}).then(result=>{
                //     this.show=true
                //     this.$axios.get('/vue/getcomment',{params:{themeid:this.id}}).then(result=>{
                //         this.comments =result.data.result
                //         this.word=''
                //     })
                // })

                http({
                    url:"https://xiaoshunshun.cn:1901/vue/setcomment",
                    method:'POST',
                    data:{
                        themeid,username,word,time,avatar
                    },
                    success:(result)=>{
                        this.show=true
                        http({
                            url:"https://xiaoshunshun.cn:1901/vue/getcomment",
                            method:'GET',
                            data:{
                                themeid:this.id
                            },
                            success:()=>{
                                this.comments =result.data.result
                                this.word=''
                            }
                        })
                    }
                })
            }else{
                this.show=true
            }
        }
    }
}
</script>

<style scoped>
    .foot{
        border-top: 1px solid #ddd;
        width: 100%;
        background: #fff;
        padding: 0.2rem 0.3rem;
        position: fixed;
        bottom: 0;
        
    }
    .box{
        width: 100%;
        height:100vh;
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        left: 0;
        top:0;
        z-index: 10
    }
    .button{
        height: 1.0rem;
        width: 100%;
        height: 100%;
        background: #eee;
        text-indent: 0.2rem;
        border-radius: 0.1rem;
        line-height: 0.6rem;
    }
    textarea{
        width: 100%;
        background: #eee;
        font-size: 0.35rem;
        padding: 0.2rem 0.3rem;
        border-radius: 0.1rem;
        line-height: 0.45rem;
        border: 1px solid #ccc;
    }
    .push{
        border: 1px solid goldenrod;
        color: goldenrod;
        width: 1.2rem;height: 0.5rem;
        text-align: center;
        line-height: 0.46rem;
        margin-top: 0.2rem;
        margin-left: 82%;
        border-radius: 0.05rem
    }
</style>
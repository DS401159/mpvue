<template>
  <div class="user">
    <img class="bg" src="/static/images/timg.jpg" background-size="cover" />
    <!-- 获取用户头像 -->

    <div class="container">
      <div class="userinfo" v-if="userInfo.nickName">
        <p>基本信息</p>
        <img class="userinfo-avatar" :src="userInfo.avatarUrl" background-size="cover" />
        <p class="userinfo-nickname">{{userInfo.nickName}}</p>
      </div>
      <button
        v-if="!userInfo.nickName"
        open-type="getUserInfo"
        @getuserinfo="authSetUser"
        class="toLogin"
      >授权登录</button>
    </div>
    <!-- 个人中心列表 -->
    <div class="list">
      <div class="wallet">
        <img class="imgs" src="/static/images/wallet.png" />
        <span class="txt">我的财富</span>
      </div>
      <div class="f2">
        <div class="photo">
          <img class="imgs" src="/static/images/photo.png" />
          <span class="txt">我的照片</span>
        </div>
        <div class="liuyan">
          <img class="imgs" src="/static/images/liuyan.png" />
          <span class="txt">我的留言</span>
        </div>
      </div>
      <div class="f3">
        <div class="place">
          <img class="imgs" src="/static/images/place.png" />
          <span class="txt">我的地点</span>
        </div>
        <div class="liulan">
          <img class="imgs" src="/static/images/liulan.png" />
          <span class="txt">我的浏览</span>
        </div>
        <div class="collection">
          <img class="imgs" src="/static/images/collection.png" />
          <span class="txt">我的收藏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { http } = require("../../utils/ajax");


export default {
  components: {
  
  },

  data () {
    return {
      userInfo: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    authSetUser(e) {
      this.userInfo = e.mp.detail.userInfo;
    },
    getUserInfo() {
      // 调用登录接口
      var _this = this;
      mpvue.getUserInfo({
        //当已授权getUserInfo时
        success(res) {
          console.log(res);
          _this.userInfo = res.userInfo;
          mpvue.login({
            success: res => {
              if (res.code) {
                //发起网络请求
                http({
                  url: "https://test.com/onLogin",
                  data: {
                    code: res.code
                  },
                  success: result => {
                    http({
                      url: "https://api.weixin.qq.com/sns/jscode2session",
                      data: {
                        appid: "wxee77534ba004d7ff",
                        secret: "9841390c8970b85dcb013a12918230da",
                        js_code: res.code,
                        grant_type: "authorization_code"
                      },
                      success: value => {
                        console.log(value);
                      }
                    });
                  }
                });
              } else {
                console.log("登录失败！" + res.errMsg);
              }
            }
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    }
  }
};

//index.js
//获取应用实例
</script>

<style scoped>
.user{
  width: 100%;
  height: 100vh;
}
.bg {
  width: 100%;
  height: 450rpx;
  position: absolute;
  z-index: 1;
  top: 0;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  box-shadow: 0 0.3rem 0.5rem 0 rgba(209, 167, 252, 0.87);
}
/* 个人中心列表样式 */
.list {
  width: 100%;
  height: 75%;
  position: absolute;
  top: 400rpx;
  left: 0;
  z-index: 99;
}
.wallet {
  width: 92%;
  height: 120rpx;
  border-radius: 5px;
  background-color: #fff;
  margin: auto;
  box-shadow: 0 0.3rem 0.5rem 0 rgba(209, 167, 252, 0.87);
  display: flex;
}
.imgs {
  width: 55rpx;
  height: 55rpx;
  margin-left: 5%;
  margin-top: 5%;
}
.txt {
  font-size: 32rpx;
  line-height: 120rpx;
  margin-left: 3%;
}

.f2 {
  width: 92%;
  height: 240rpx;
  border-radius: 6px;
  background-color: #fff;
  margin: auto;
  margin-top: 20rpx;
  box-shadow: 0 0.3rem 0.5rem 0 rgba(209, 167, 252, 0.87);
}

.photo,
.liuyan,
.place,
.liulan,
.collection {
  height: 120rpx;
  display: flex;
}
.f3 {
  width: 92%;
  height: 360rpx;
  border-radius: 6px;
  background-color: #fff;
  margin: auto;
  margin-top: 20rpx;
  box-shadow: 0 0.3rem 0.5rem 0 rgba(209, 167, 252, 0.87);
}

/* 用户头像样式 */
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  top: 100rpx;
  border-radius: 50%;
  position: absolute;
  z-index: 100;
}

.userinfo-nickname {
  color: #333;
  position: absolute;
  top: 260rpx;
  z-index: 100;
  font-size: 40rpx;
  font-family: "楷体";
  font-weight: 500;
}

.toLogin {
  width: 300rpx;
  height: 100rpx;
  font-size: 32rpx;
  position: absolute;
  z-index: 100;
}
</style>

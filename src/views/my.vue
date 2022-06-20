<template>
  <div class="my-container">

 <!-- 已登陆状态显示页面 -->
    <div class="next-banner" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar"
  round
  fit="cover"
  :src="userInfo.photo"
/>
<span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button round size="mini" class="btn-user">编辑资料</van-button>
        </div>
      </div>
      <div class="bottom-info">
        <div class="data-item">
          <span class="text_data">{{userInfo.art_count}}</span>
          <i class="text_data2">头条</i>
        </div>
         <div class="data-item">
          <span class="text_data">{{userInfo.follow_count}}</span>
          <i class="text_data2">关注</i>
        </div>
         <div class="data-item">
          <span class="text_data">{{userInfo.fans_count}}</span>
          <i class="text_data2">粉丝</i>
        </div>
         <div class="data-item">
          <span class="text_data">{{userInfo.like_count}}</span>
          <i class="text_data2">获赞</i>
        </div>
      </div>
    </div>
    <!-- 未登录状态显示页面 -->
    <div class="top-banner"  v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="imgbtn" src="@/assets/mobile.png" alt="">
       <span class="text">登录 / 注册</span></div>

    </div>

    <!-- 收藏、历史页面，前面是自己写的 后面用的vant Grid宫格 -->
    <!-- <div class="Collection-history">

      <div class="Collection">
        <i class="toutiao toutiao-shoucang"></i>
        <span class="xx">收藏</span>
      </div>
      <div class="history">
        <i class="toutiao toutiao-lishi"></i>
        <span class="xx">历史</span>
      </div>
    </div> -->
    <van-grid :column-num="2" clickable class="md8" >
  <van-grid-item >
    <i slot="icon" class="toutiao toutiao-shoucang"></i>
    <span slot="text" >收藏</span>
  </van-grid-item>
   <van-grid-item >
    <i slot="icon" class="toutiao toutiao-lishi"></i>
    <span slot="text" >历史</span>
  </van-grid-item>
    </van-grid>
 <!-- 小智同学区域 用vant中cell单元格 -->
   <van-cell title="消息通知" is-link />
  <van-cell class="xiaozhi" title="小志同学" is-link/>
  <van-cell title="退出登录"  class="md0" v-if="user" @click="Logout"/>
  </div>
</template>

<script>
// import { removeItem } from '@/utils/localStorage.js'
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'myIndex',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.getsuermsg()
    }
  },
  mounted () {},
  destroyed () {},
  methods: {
    Logout () {
      this.$dialog.confirm({
        title: '确定要退出登录吗'

      })
        .then(() => {
          this.$store.commit('setuserToken', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async  getsuermsg () {
      try {
        const { data } = await getUserInfo()
        // 调用接口获取用户信息赋值给组件的data中 后续渲染在页面里
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户信息失败，请稍后再试')
      }
    }
  }
}

</script>
<style lang='less' scoped>
.my-container{
  .top-banner{
        height: 180px;
             background:url("../assets/banner.png")
    }
    .top-banner{
      display: flex;
      justify-content: center;
      align-items: center;

      .login-btn{
          display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .imgbtn{
        width: 66px;
        height: 66px;
      }
      .text{
        margin-top: 8px;
        font-size: 14px;
        color: white;
      }
      }
    }
  }

  .next-banner{
    background:url(@/assets/banner.png);
    background-size: cover;
    height: 180px;
    .base-info{
      height: 115px;
      display: flex;
      justify-content: space-between;
      // background-color: pink;
      padding: 37px 16px 11px 16px;
      box-sizing: border-box;
      .left{display: flex;
      align-items: center;
        .avatar{
          border: 2px solid #fff;
          height: 66px;
          width: 66px;
        }
        span{
          font-size: 15px;
          margin-left: 10px;
          color: #fff;
        }
      }
      .right{
        display: flex;
        align-items: center;
        .btn-user{
          font-size: 10px;
          color: #666666;
        }
      }

    }
    .bottom-info{
      padding: 15px;
      // background-color: red;
      height: 65px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      .data-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .text_data{
          color: #fff;
          font-size: 13px;
        }
        .text_data2{
          color: #fff;
          font-size: 11px;
        }
      }
    }
  }
  // .Collection-history{
  //   height: 70px;
  //   background-color: #fff;
  //   display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  //   // flex-direction: column;
  //   .Collection{
  //     display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  //   flex-direction: column;
  //   .toutiao-shoucang {
  //     font-size: 23px;
  //     color: red;
  //   }
  //   .xx{
  //     font-size: 14px;
  //     color: #333333;
  //   }
  //   }
  //   .history{
  //     display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  //   flex-direction: column;
  //   .toutiao-lishi {
  //     font-size: 23px;
  //     color:#ff9d1d;
  //   }
  //   .xx{
  //     font-size: 14px;
  //     color: #333333;
  //   }
  //   }
  // }
.van-grid-item{
  i{
    color: #ff9d1d;
    font-size:23px
  }
  span{
     color: #333333;
    font-size: 14px;

  }
}
.xiaozhi{
  margin-bottom: 4px;
}
.md8{
    margin-bottom: 4px;
}
.md0{
  text-align: center;
  font-size:15px ;
  color: #d86262;
}
</style>

<template>
  <div class="home-container">
    <!-- 头部导航部分 -->
    <van-nav-bar fixed>
      <van-button round size="small" type="info" slot="title" icon="search" to="/search" >搜索</van-button>
    </van-nav-bar>
    <!-- tab-bar标签页 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
  <van-tab
  :title="item.name"
  v-for="item in pindaolist" :key="item.id"
  >
  <!-- 创建文章列表组件并加载到此处（文章内容处） 将获取到的数据item用父传子传给article组件，因为包含在文章频道的v-for中  所以可以把item传给article N次 -->
 <article-list :articleList="item"></article-list>
  </van-tab>
   <div slot="nav-right" class="placeholder"></div>
  <div
  slot="nav-right"
  class="gengduo"
  @click="channel_popup=true" >
    <i class="toutiao toutiao-gengduo"></i>
  </div>

</van-tabs>
<!-- 点击按钮弹出频道页面 ---vant popup弹出层 -->

<van-popup
  v-model="channel_popup"
  closeable
  position="bottom"
  close-icon-position="top-left"
  :style="{ height: '100%' }"
>
<tanchuceng @onedit="qiehuanpindao" :mychannel="pindaolist" :active="active" ></tanchuceng >
</van-popup>
  </div>
</template>

<script>
import { getUserchannel } from '@/api/user.js'
import articleList from '@/components/article.vue'
import tanchuceng from '@/components/home-popup.vue'
export default {
  name: 'homeIndex',
  components: {
    articleList,
    tanchuceng
  },
  mixins: [],
  props: {},
  data () {
    return {
      active: 0,
      pindaolist: [],
      channel_popup: false

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getuserpindao()
  },
  mounted () {},
  destroyed () {},
  methods: {
    async getuserpindao () {
      try {
        const { data } = await getUserchannel()

        // console.log(data)
        this.pindaolist = data.data.channels
      } catch (error) {
        console.log('获取用户频道失败')
      }
    },
    qiehuanpindao (value, IsShow = true) {
      // 更新高亮的频道
      this.active = value
      this.channel_popup = IsShow
    }

  }
}

</script>

<style lang='less' scoped>
.home-container{
  padding-bottom: 50px;
  padding-top:87px ;
  // position: fixed;
}
.van-nav-bar{
  background-color: #3296fa

}
.van-nav-bar__title{
  max-width: unset;

}
 .van-button{
  height: 32px;
  width: 278px;
  background-color: #5babfb;
  font-size: 14px;
  .van-icon{
 color: #fff;
 font-size: 16px;
  }
  }
  .van-tabs__wrap{
    height: 40px;

  }

  /deep/.channel-tabs{
    .van-tabs__wrap{
      height: 40px;
      position: fixed;
    top: 45px;
    left: 0;
    z-index: 1;
    right: 0;
    }
    .van-tab{
      // height: 40px;
      border-right: 1px solid #edeff3;
      min-width: 100px;
       font-size: 15px;
       color: #777777;
    }
    .van-tab--active{
      color: #333333;
    }
    .van-tabs__line{
      width: 15px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .gengduo{
      position: fixed;
      right: 0;
      width: 33px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.902;
      background-color: #fff;
      color: #333333;
      i.toutiao{
        font-size: 17px;
      }
      &::before{
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: url(@/assets/gradient-gray-line.png);
        background-size:contain ;
      }
      .placeholder{
        position: absolute;
        right: 0;
        width: 33px;
        height: 40px;
        flex-shrink:0 ;
      }

    }

  }

</style>

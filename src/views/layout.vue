<template>
  <div class="layout-container">

    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 底部tab-bar -->
<van-tabbar  route>
  <van-tabbar-item to="/" >
    <i  class="toutiao toutiao-shouye" slot="icon"></i>
    <span class="text">首页</span>
    </van-tabbar-item>
     <van-tabbar-item to="/answer" >
    <i  class="toutiao toutiao-wenda"  slot="icon"></i>
    <span class="text">问答</span>
    </van-tabbar-item>
     <van-tabbar-item to="/vidieo" >
    <i  class="toutiao toutiao-shipin" slot="icon"></i>
    <span class="text">视频</span>
    </van-tabbar-item>
     <van-tabbar-item to="/my">
    <i  class="toutiao toutiao-wode" slot="icon"></i>
    <span class="text">{{this.$store.state.user? '我的':'请登录'}}</span>
    </van-tabbar-item>

</van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'layoutIdex',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {}
}

</script>
<style lang='less' scoped>
.layout-container{
  .van-tabbar{
    .toutiao{
      font-size: 20px;
    }
    .text{
      font-size: 10px;
    }

  }
}
</style>

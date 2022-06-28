<template>
  <div class="articleList-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  success-text="刷新成功" >
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- <van-cell v-for="article in list" :key="(article.index)" :title="article.title" /> -->
  <articleItem v-for="article in list" :key="(article.index)" :article="article" ></articleItem>
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getarticlenews } from '@/api/user.js'
import articleItem from '@/components/articleItem.vue'
export default {
  name: 'articleList',
  components: {
    articleItem
  },
  mixins: [],
  props: {
    articleList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false
    }
  },

  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    async  onLoad () {
      // vant组件list 中 onload方法 会在初始化和滑动到末尾调用,并且将load设置为true 显示加载中，待异步操作（发起请求）结束后需要手动把loading设置为false 不然一直显示加载中，
      // 1.发起请求拿到数据，将数据存储在list中，将loding状态设置为false
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getarticlenews({
          channel_id: this.articleList.id,
          timestamp: this.timestamp || Date.now()
        })
        // console.log(Date.now())
        console.log(data)
        const { results } = data.data
        // console.log(results)
        // const results = data.data
        // console.log(results)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log('获取文章信息失败')
      }
    },
    async  onRefresh () {
      // 继续调用接口刷新数据，因为下拉刷新都是需要刷新到的最新数据，所以时间戳需要传入最新的
      try {
        const { data } = await getarticlenews({
          channel_id: this.articleList.id,
          timestamp: Date.now()
        })
        console.log(data)
        this.list.unshift(...data.data.results)
        this.isLoading = false
      } catch (error) {
        console.log('请求失败')
      }

      this.isLoading = false
    }
  }
}

</script>
<style lang='less' scoped>
.articleList-container{
   height: 80vh;
    overflow-y:auto ;
}
</style>

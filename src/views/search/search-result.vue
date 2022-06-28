<template>
  <div class="result">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'search-result',
  components: {},
  mixins: [],
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    async  onLoad () {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取搜索结果失败')
      }

      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }

      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 5) {
      //     this.finished = true
      //   }
      // }, 1000)
    }
  }
}

</script>
<style lang='less' scoped>
</style>

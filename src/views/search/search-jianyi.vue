<template>
  <div class="jianyi">
 <van-cell v-for="(item,index) in searchjianyi " :key="index" :title="item"  icon="search" @click="$emit('search',item)" />
  </div>
</template>

<script>
import { getSearchjianyi } from '@/api/search.js'
export default {
  name: 'search-jianyi',
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
      searchjianyi: []

    }
  },
  computed: {},
  watch: {
    // 监听父组件传过来的文本框的变化，immediate属性可以立即监听，监听完后调用接口获取数据
    searchText: {
      handler (value) {
        console.log(value)
        this.getjianyi(value)
      },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    async  getjianyi (q) {
      try {
        const { data } = await getSearchjianyi(q)
        console.log(data)
        this.searchjianyi = data.data.options
      } catch (error) {
        this.$toast('获取搜索建议失败')
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>

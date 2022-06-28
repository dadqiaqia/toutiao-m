<template>
  <div class="search-container">

    <!-- 顶部搜索栏 -->
    <form action="/">
      <van-search class="nav_search"
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="isResultshow=false"
  />
  </form>

  <!-- 搜索结果 -->
    <result v-if="isResultshow" :searchText="searchText"></result>
    <!-- 搜索结果 -->

  <!-- 联想建议 -->
    <jianyi v-else-if="searchText" :searchText="searchText" @search="onSearch"></jianyi>
     <!-- 联想建议 -->

     <!-- 搜索历史 -->
     <sousuolishi v-else :lishiq="lishi" @update_lishi="lishi=[]"  @search="onSearch"></sousuolishi>
     <!-- 搜索历史 -->

  </div>
</template>

<script>
import jianyi from '@/views/search/search-jianyi.vue'
import sousuolishi from '@/views/search/search-sousuolishi.vue'
import result from '@/views/search/search-result.vue'
import { setItem, getItem } from '@/utils/localStorage.js'
export default {
  name: 'searchIndex',
  components: {
    jianyi,
    result,
    sousuolishi
  },
  mixins: [],
  props: {},
  data () {
    return {
      searchText: '',
      isResultshow: false,
      lishi: getItem('TOUTIAO_LISHI') || []

    }
  },
  computed: {},
  watch: {
    lishi: {
      handler (value) {
        setItem('TOUTIAO_LISHI', value)
      }
    }
  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    onSearch (value) {
      // console.log(value)
      this.searchText = value

      const index = this.lishi.indexOf(value)
      if (index !== -1) {
        this.lishi.splice(index, 1)
      }
      this.lishi.unshift(value)

      this.isResultshow = true
    },
    onCancel () {
      this.$router.back()
    }

  }
}

</script>
<style lang='less' scoped>
 .search-container{
  padding-top:50px;
  /deep/ .nav_search{
    background-color: #3296fa;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    .van-search__action{
      color: #fff;
    }

    }
  }

</style>

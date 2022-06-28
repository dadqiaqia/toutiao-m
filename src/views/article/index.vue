<template>
  <div class="article_xiangqing" >
    文章详情页
    id:{{articleId }}
    <button @click="$router.back()">返回</button>
  </div>
</template>

<script>
export default {
  name: 'Article_index',
  components: {},
  mixins: [],
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
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
</style>

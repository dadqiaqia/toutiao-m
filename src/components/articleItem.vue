
<template>

  <van-cell class="articleItem-container" :to="{
    name:'article',
    params:{
      articleId:article.art_id

    }
  }">
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label" >
      <div v-if="article.cover.type===3" class="cover-wrap" >
          <div class="cover-item" v-for="(item,index) in article.cover.images"
          :key="index" >
             <van-image class="image1"
               fit="cover"
                 :src="item"/>

          </div>
      </div>

      <div class="lable">
      <span class="lable-text " > {{article.aut_name}} </span>
      <span> 评论{{article.comm_count}} </span>
      <span> {{article.pubdate | relativeTime}} </span>
      </div>
    </div>

      <van-image class="image1" slot="default"
v-if="article.cover.type===1"
      fit="cover"
  :src="article.cover.images[0]"
/>

  </van-cell>

</template>

<script>
export default {
  name: 'articleItem',
  components: {},
  mixins: [],
  props: {
    article: {
      type: Object,
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
.articleItem-container{
  .cover-wrap{
    display: flex;
    padding: 10px 0;
// align-content: center
.cover-item{
  flex: 1;
  // height: 75px;
  &:not(:last-child){
    padding-right: 2px;
  }
}
  }
  .title{
    font-size: 16px;
    color: #3a3a3a;
    // overflow:hidden;
    // -webkit-line-clamp:1;
    // text-overflow:ellipsis;
  }
}
.lable{
  font-size: 12px;
  color: #b4b4b4;
  .lable-text{
    // margin-right:12px ;
  }
}
.van-cell__value{
  flex: unset;
  padding-left: 5px;
}
.image1{
  width: 115px;
  height: 75px;
}
</style>

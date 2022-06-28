<template>
 <div>
   <van-cell class="ss" title="搜索历史">
    <span class="aa" slot="default" v-if="isDeleteShow" @click="$emit('update_lishi')">全部删除</span>
      <span slot="default" v-if="isDeleteShow" @click="isDeleteShow=false">完成</span>
      <van-icon name="delete" v-else @click="isDeleteShow=true" />
   </van-cell>
   <van-cell v-for="(item,index) in lishiq" :key="index"  :title="item" @click="ondeleteOrsezrch(item,index)" >
        <van-icon slot="default" name="close" v-if="isDeleteShow" />
   </van-cell>

 </div>
</template>

<script>
export default {
  name: 'search-sousuolishi',
  components: {},
  mixins: [],
  props: {
    lishiq: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false,
      lishiqs: this.lishiq
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    ondeleteOrsezrch (item, index) {
      // 删除状态下，执行删除操作
      if (this.isDeleteShow) {
        this.lishiqs.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}

</script>
<style lang='less' scoped>
.ss{

  font-size: 20px;
.van-cell__value{
   font-size: 15px;
  //  margin-right: 5px;
}
.aa{
  margin-right: 5px;
}
}
</style>

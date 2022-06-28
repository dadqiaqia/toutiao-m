<template>
  <div class="home-popup">

    <!-- 我的频道 -->
     <van-cell  :border="false">
      <div slot="title" class="title" >我的频道</div>
       <van-button slot="default" class="edit" type="danger" size="mini" plain round @click="show">{{flag ? '完成':'编辑'}}</van-button>
     </van-cell>
     <van-grid :gutter="10" class="mytuijian">

  <van-grid-item v-for="(item,index) in mychannel" :key="item.id" @click="editOrremove(item,index)"  >
  <van-icon  v-if="flag && !noedit.includes(item.id)"    slot="icon" name="close" ></van-icon>
  <span slot="text" :class="{active:index===active}" class="text1">{{item.name}}</span>
  </van-grid-item>

</van-grid>

<!-- // 频道推荐 -->

 <van-cell :border="false" >
      <div slot="title" class="title">推荐频道</div>
     </van-cell>
     <van-grid :gutter="10" class="tuijian" >
  <van-grid-item @click="addpindao(item)"  v-for="item in tuijianpindao" :key="item.id"   :text="item.name" icon="plus" />
</van-grid>
  </div>
</template>

<script>
import { getAllpindao, getuserChannels, deleteUserchannel } from '@/api/user.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'

export default {
  name: 'home-popup',
  components: {},
  mixins: [],
  props: {
    mychannel: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      ALLpindao: [],
      mychannels: this.mychannel,
      flag: false,
      noedit: [0]

    }
  },
  computed: {
    // 定义一个计算属性的方法，将获取的全部频道遍历，在函数中，用find（）方法查找与我的频道id相同的id 并返回，
    tuijianpindao () {
      const channels = []
      this.ALLpindao.forEach((Allchannel) => {
        const res = this.mychannel.find((mychannel) => {
          return mychannel.id === Allchannel.id
        })

        // res为与我的频道id相同的全部频道中的id    将id不是这几个的数组添加到新的channel数组中 最后返回channel数组
        if (!res) {
          channels.push(Allchannel)
        }
      })
      return channels
    },
    ...mapState(['user'])

  },
  watch: {},
  created () {
    this.loadAllpindao()
  },
  mounted () {},
  destroyed () {},
  methods: {
    async loadAllpindao () {
      try {
        const { data } = await getAllpindao()
        // console.log(data)
        this.ALLpindao = data.data.channels
      } catch (error) {
        this.$toast('获取全部频道失败')
      }
    },
    async   addpindao (channel) {
      this.mychannels.push(channel)
      if (this.user) {
        try {
          // 如果已经登录，将数据存储到线上
          await getuserChannels({
            id: channel.id,
            seq: this.mychannels.length
          })
        } catch (error) {
          this.$toast('保存失败，稍后再试')
        }
      } else {
        // 存储到本地
        setItem('bendiCOOK', this.mychannels)
      }
    },
    show () {
      this.flag = !this.flag
    },
    // 编辑和删除频道
    editOrremove (item, index) {
      // 判断状态  如果是编辑状态就执行删除操作，如果是正常状态就执行切换频道操作
      if (this.flag) {
        if (this.noedit.includes(index)) {
          return
        }
        if (index <= this.active) {
          this.$emit('onedit', this.active - 1, true)
        }
        this.mychannels.splice(index, 1)

        // 处理持久化
        this.deleteChannel(item)
      } else {
        // console.log(item, index)

        // 切换频道直接修改active就可以，但是由于子组件不能直接修改父组件数据，这里用到子组件通信
        this.$emit('onedit', index, false)
      }
    },
    async deleteChannel (channel) {
      // 删除线上频道
      if (this.user) {
        try {
          await deleteUserchannel(channel.id)
        } catch (error) {
          this.$toast('删除频道失败')
        }
      } else {
        setItem('bendiCOOK', this.mychannels)
      }
    }
  }
}

</script>
<style lang='less' scoped>
.home-popup{
  padding: 45px 0;
  .title{
    font-size: 18px;
    color: #333333;
  }
  .edit{
    font-size: 12px;
  }
  .van-grid{
    padding: 10px 0;
  }
  /deep/.van-grid-item{
    width: 80px;
    height: 43px;
    .van-grid-item__content{
 background-color: #f4f5f6;
 .van-grid-item__text,.text1 {
  font-size: 15px;
  color: #222222;
  margin-top: 0;
 }.active{
  color: red;
 }
  .van-grid-item__icon-wrapper{
    position: unset;
  }
 .van-icon-close {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size:18px;

 }

    }
  }
  /deep/.tuijian{
   .van-grid-item{
      .van-grid-item__content{
        white-space: nowrap;
        flex-direction: row;
        text-align: center;
        .van-icon-plus{
 font-size:13px ;
margin-right: 3px;
        }
        .van-grid-item__text{
           font-size:15px ;
           margin-top: 0;
        }

      }
    }
  }

}
</style>

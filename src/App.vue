<template>
  <div id="app">
    <router-view/>
<!-- <p> {{this.$store.state.count}}</p>
<button @click="add">+1</button>
<button @click="sub1">-1</button>
<p>count的值是{{count}}</p>
<button @click="subyb">+1异步加1</button> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['count'])
  },
  methods: {
    add () {
      this.$store.commit('add', 3)
    },
    ...mapMutations(['sub', 'sub3']),
    sub1 () {
      this.sub(3)
    },
    ...mapActions(['sub3Async']),
    subyb () {
      // this.$store.dispatch('sub3Async')
      this.sub3Async()
    }
  }
}
</script>
<style lang="less">

</style>

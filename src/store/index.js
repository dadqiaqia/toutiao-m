import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/localStorage.js'

Vue.use(Vuex)
const usertoken = 'toutiaotouken'
export default new Vuex.Store({

  state: {
    count: 1,
    // user: null
    // user: JSON.parse(window.localStorage.getItem(usertoken)) // 先将user设置为null获取到token对象之后将本地储存中的token赋值给user，注意：这里用JSON.parse（）方法将字符串格式的token转换为对象格式，方便后续访问到token
    user: getItem(usertoken)
  },
  getters: {
  },
  mutations: {
    add (state, step) {
      state.count += step
    },
    sub (state, step) {
      state.count -= step
    },
    sub3 (state) {
      state.count++
    },
    setuserToken (state, data) {
      state.user = data
      // 获取到token数据之后  为了防止刷新vue页面state数据丢失，我们把token存储在本地储存 并将本地储存与vuex相结合（让state直接向本地储存取值），注意：由于localstorage只能存字符串格式，需要将获取到的data对象转换为JSON字符串格式，
      // window.localStorage.setItem(usertoken, JSON.stringify(state.user))
      setItem(usertoken, state.user)
    }
  },
  actions: {
    sub3Async (context) {
      setTimeout(() => {
        context.commit('sub3')
      }, 1000)
    }
  },
  modules: {
  }
})

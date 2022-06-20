<template>

  <div class="login_container">
     <!-- 登陆页面顶部导航栏 -->
    <van-nav-bar @click-left="onClickLeft" left-arrow title="登录"
></van-nav-bar>
 <!-- /登陆页面顶部导航栏 -->

 <!-- 手机号验证码及登录按钮表单 -->
<van-form @submit="onSubmit" ref="login_Form">
  <van-field v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
     :rules="userFormRules.mobile"
     maxlength="11"
     type="number"
  > <i slot="left-icon" class="toutiao toutiao-shouji">  &nbsp;</i>
  </van-field>
  <van-field v-model="user.code"
    name="code"
    maxlength="6"
    type="number"
    :rules="userFormRules.code"
    placeholder="请输入验证码"
  > <i slot="left-icon" class="toutiao toutiao-yanzhengma"> &nbsp; </i>
  <!-- 获取验证码按钮 -->
   <template #button>
    <van-count-down :time="1000*5" format="ss 秒" @finish="isCountShow=false" v-if="isCountShow"/>
    <van-button v-else class="send_btn" native-type="button" round size="small"  type="default" @click="sedYZM">获取验证码</van-button>
  </template>
   <!-- 获取验证码按钮 -->
  </van-field>
  <!-- 登录按钮 -->
  <div class="login_btn" >
    <van-button  block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
 <!-- //手机号
 验证码及登录按钮表单 -->

 <div class="tiaokuan">
  隐私条款
 </div>
  </div>
</template>

<script>
import { loginApi, sendSms } from '@/api/user'
export default {
  name: 'ToutiaoLogin',
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''

      },
      userFormRules: {
        mobile: [{
          required: true,
          trigger: onblur,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, // vant 2.5.3支持 本项目版本2.5.2
          message: '请输入正确格式的手机号'
        }],
        code: [{
          required: true,
          trigger: onblur,
          message: '验证码不能为空'

        }, {
          pattern: /^\d{6}$/, // vant 2.5.3支持 本项目版本2.5.2
          message: '请输入正确格式的验证码'
        }]

      },
      isCountShow: false

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    async onSubmit () {
      // 1 获取表单中的user数据  、发起登录请求

      // 登录提示组件 toast
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: '0'

      })
      const user = this.user
      try {
        const { data } = await loginApi(user) // 调用接口登录
        console.log(data) // 打印接口获取到的data数据
        this.$store.commit('setuserToken', data.data) // 调用vuex中的mutations中的setuserToken方法，并将获取到的数据传送过去
        this.$toast.success({
          // 提示登陆状态
          message: '登陆成功',
          forbidClick: true

        },
        this.$router.back())
        console.log('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail({
            message: '手机号或验证码错误',
            forbidClick: true
          })
          console.log('手机号或验证码错误')
        } else {
          this.$toast.fail({
            message: '登录失败，请稍后再试',
            forbidClick: true
          })
        }
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    async sedYZM () {
      // 1.校验手机号 2.进入倒计时 3.调用接口获取验证码
      try {
        await this.$refs.login_Form.validate('mobile')
        // vant-通过 ref 可以获取到 Form 实例并调用实例方法,validate,验证表单，支持传入 name 来验证单个或部分表单项，vant方法
      } catch (error) {
        return console.log('验证失败')
      }
      // vant-通过 ref 可以获取到 Form 实例并调用实例方法,validate,验证表单，支持传入 name 来验证单个或部分表单项
      // 2. 手机号验证通过 开启倒计时
      this.isCountShow = true
      // 3. 调用接口 发送验证码

      try {
        await sendSms(this.user.mobile)

        this.$toast('发送验证码成功！')
      } catch (error) {
        const res = this.isCountShow = false
        console.log(res)
        if (error.response.status === 429) { this.$toast('发送过于频繁,请稍后再试') }
        this.$toast('发送失败，请重试')
      }
    }
  }
}

</script>
<style lang='less' scoped>

.van-nav-bar{
  background-color: #3296fa;
  .van-nav-bar__title{
    color: #fff;
    font-size: 16px;
  }
}
.toutiao{
  font-size: 20px;
  color: #666666;
}
.send_btn{
  background-color: #ededed;
  .van-button__text{
    font-size: 11px;
    color: #666666;
  }
}
.login_btn{
  padding: 27px 14px;
  .van-button{
    width: 347px;
    height: 44px;
    border-radius:5px ;
    border:none ;
    font-size: 15px;
  }
}
.tiaokuan{
  width: 60px;
  height: 13px;
  font-size: 13px;
  margin: 380px auto;
  color: #666666;
}.van-icon{
  color: #fff;
}

</style>

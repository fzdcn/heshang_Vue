<template>
  <div class="login-page">
    <div class="main clearfix">
      <div class="logo-box">
        <img src="/static/images/logo.png" alt="logo">
      </div>
      <div class="login-box">
        <label class="login-item username">
          <span class="label">帐号</span>
          <input class="input-item" v-model="username" type="text" placeholder="请输入用户名或手机号">
        </label>
        <label class="login-item password clearfix">
          <span class="label">密码</span>
          <input class="input-item" v-model="password" type="password" placeholder="请输入密码">
        </label>
      </div>
      <button type="button" class="submit-btn btn btn-red" @click="handleSubmit">登录</button>
      <router-link :to="{name:'register'}" class="go-register fr">去注册</router-link>
    </div>
  </div>
</template>

<script>
  import {showAlert} from '../../functions'
  import {DEBUG} from '../../config/const'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
      }
    },
    methods: {
      handleSubmit () {
        if (this.username && this.password) {
          this.$httpPost('login', {
            'username': this.username,
            'password': this.password
          }).then((data) => {
            this.$store.dispatch('userSignIn', data.data)
            showAlert('登陆成功！', 'success')
            let redirectName = this.$store.getters.loginRedirect
            if (!redirectName) {
              redirectName = 'home'
            }
            this.$router.replace({path: redirectName})
          })
        } else {
          showAlert('请填写登陆信息！')
        }
      }
    },
    mounted () {
      if (DEBUG) {
        this.username = '13401492701'
        this.password = '123456'
      }
    }
  }
</script>

<style scoped lang="stylus">

  @import "../../assets/login.styl"

  .login-page
    .main
      margin-top px2rem(200px)

</style>

<template>
  <div class="login-page">
    <div class="main clearfix">
      <div class="logo-box">
        <img src="/static/images/logo.png" alt="logo">
      </div>
      <div class="login-box">
        <label class="login-item username">
          <span class="label">姓名</span>
          <input class="input-item" v-model="form.name" type="text">
        </label>
        <label class="login-item password">
          <span class="label">密码</span>
          <input class="input-item" v-model="form.password" type="password">
        </label>
        <label class="login-item password">
          <span class="label">手机号</span>
          <input class="input-item" v-model="form.cellphone" type="number">
        </label>
        <label class="login-item password">
          <span class="label">短信验证码</span>
          <span @click="sendSmsCode" class="label addon">{{ sms_time > 0 ? sms_time : '获取' }}</span>
          <input class="input-item has-addon" v-model="form.sms_code" type="text">
        </label>
        <label class="login-item password">
          <span class="label">推荐码</span>
          <span @click="checkRecommendUser" class="label addon">检查</span>
          <input class="input-item" v-model="form.recommend_code" type="text" placeholder="您的推荐人编码">
        </label>
        <label v-if="recommendUserName" class="login-item password">
          <span class="label">推荐人</span>
          <input class="input-item" :value="recommendUserName" type="text" disabled>
        </label>
      </div>
      <button type="button" class="submit-btn btn btn-red" @click="handleSubmit">注册</button>
      <router-link :to="{name: 'login'}" class="go-register fr">去登录</router-link>
    </div>
  </div>
</template>

<script>
  import {showAlert, requestGet} from '../../functions'
  import {DEBUG} from '../../config/const'

  export default {
    name: 'register',
    data () {
      return {
        form: {
          name: '',
          password: '',
          cellphone: '',
          sms_code: '',
          recommend_code: '',
        },
        recommendUserName: '',
        sms_time: 0,
        sms_time_interval: ''
      }
    },
    methods: {
      sendSmsCode () {
        if (this.sms_time <= 0) {
          this.$httpPost('login/send-sms', {
            cellphone: this.form.cellphone
          }).then(({data}) => {
            showAlert(data, 'success')
            this.smsTimeCountDown()
          })
        } else {
          showAlert('已经发送，请耐心等待');
        }
      },
      smsTimeCountDown () {
        this.sms_time = 60
        this.sms_time_interval = setInterval(() => {
          if (this.sms_time <= 0) {
            clearInterval(this.sms_time_interval)
          }
          --this.sms_time
        }, 1000)
      },
      handleSubmit () {
        this.$httpPost('login/register', this.form).then(({data}) => {
          this.$store.dispatch('userSignIn', data)
          showAlert('注册并登陆成功！', 'success')
          let redirectName = this.$store.getters.loginRedirect
          if (!redirectName) {
            redirectName = 'home'
          }
          this.$router.replace({path: redirectName})
        })
      },
      checkRecommendUser () {
        this.$httpPost('login/recommend-name', {
          code: this.form.recommend_code
        }).then(({data}) => {
          this.recommendUserName = data
        })
      }
    },
    mounted () {
      let rec = requestGet('rec')
      if(rec){
        this.form.recommend_code = rec
      }
    }
  }
</script>

<style scoped lang="stylus">

  @import "../../assets/login.styl"

</style>

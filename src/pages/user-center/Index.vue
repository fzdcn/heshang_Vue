<template>
  <app-layout :title="title" :withFooter="true" :backShow="false">
    <div class="user-center">
      <div class="box">
        <user-info></user-info>
      </div>

      <user-center-top-menu></user-center-top-menu>

      <div class="box">
        <user-center-menu></user-center-menu>
      </div>

      <div class="logout">
        <div @click="logout" class="btn btn-red btn-block btn-lg bg-logout">退出登录 <i class="iconfont icon-logout"></i></div>
      </div>
    </div>
  </app-layout>
</template>

<script>
  import AppLayout from '../../components/AppLayout'
  import UserInfo from "./_UserInfo"
  import {showAlert} from '../../functions'
  import UserCenterTopMenu from "./_TopMenu";
  import UserCenterMenu from "./_Menu";

  export default {
    name: 'UserCenter',
    components: {
      UserCenterMenu,
      UserCenterTopMenu,
      UserInfo,
      AppLayout,
    },
    data () {
      return {
        title: '我的资料 <i class="iconfont icon-mine"></i>',

        userId: this.$store.getters.user.id,
        cash: this.$store.getters.user.M_purse,
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('userSignOut')
        showAlert('退出成功', 'success')
        this.$router.push({name: 'home'})
      },
    },
  }
</script>

<style scoped lang="stylus">

  @import '../../assets/variable.styl'

  .box
    background-color $white
    margin-bottom $paddingSmall
    border-top 1px solid $grey
    border-bottom 1px solid $grey

  .logout
    width 80%
    margin-left 10%
    margin-bottom $boxMarginBottom

</style>

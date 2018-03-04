<template>
  <div class="footer">
    <router-link
      v-for="(menu,index) in menus"
      class="menu-item"
      active-class="active"
      :to="menu.link"
      :key="index">
      <span v-if="menu.type && menu.type == 'logo'" class="logo">
        <img src="/static/images/logo-circle.png" alt="">
      </span>
      <span v-else>
        <i class="iconfont" :class="menu.icon"></i>
        <span class="text">{{ menu.text }}</span>
      </span>
    </router-link>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        menus: [
          {
            link: {name: 'home'},
            icon: 'icon-home',
            text: '首页'
          }, {
            link: {name: 'course'},
            icon: 'icon-course',
            text: '课程'
          }, {
            type: 'logo',
            link: {name: 'home'},
          }, {
            link: {name: 'teacher'},
            icon: 'icon-teacher',
            text: '讲师'
          }, {
            link: {name: 'user-center'},
            icon: 'icon-mine',
            text: '我的'
          },
        ]
      }
    },
    name: 'Footer'
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/variable.styl"

  .footer
    position fixed
    bottom 0
    width 100%
    height $footerHeight
    border-top $headFootBorder
    text-align center
    background-color $grey
    display flex
    justify-content space-around
    align-items center
    .menu-item
      margin-top px2rem(12px)
      float left
      color $darkGrey
      &hover, &.active
        color $red
      .logo
        display block
        border px2rem(10px) solid $white
        border-radius 50%
        width px2rem(130px)
        margin-top px2rem(-48px)
        img
          width 100%
      .iconfont
        display block
        height px2rem(44px)
        line-height px2rem(44px)
        font-size $fontSizeExtraHuge
      .text
        font-size $fontSizeMedium

</style>

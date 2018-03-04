<template>
  <div class="menu-list bg-white clearfix">
    <router-link :to="{name: 'teacher'}" class="menu-item bg-menu-1">
      金牌讲师 <span class="iconfont icon-teacher"></span>
    </router-link>
    <router-link :to="{name: 'register'}" class="menu-item bg-menu-2">
      立即报名 <span class="iconfont icon-pencil"></span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'AppMenu'
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl"

  .menu-list
    display flex
    .menu-item
      flex align-items
      width 50%
      text-align center
      margin $paddingMedium $paddingLarge
      padding $paddingSmall
      font-size $fontSizeMedium
      color $white
      background-color $red
      .text
        display block

</style>

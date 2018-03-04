<template>
  <div class="menu-list bg-white clearfix">
    <router-link :to="{name: 'my-course'}" class="menu-item bg-menu-1">
      我的课程 <span class="iconfont icon-book"></span>
    </router-link>
    <router-link :to="{name: 'cash'}" class="menu-item bg-menu-2">
      财富中心 <span class="iconfont icon-identity"></span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'UserCenterTopMenu'
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
      padding px2rem(24px)
      font-size $fontSizeMedium
      color $white
      background-color $red
      .text
        display block

</style>

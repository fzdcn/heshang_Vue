<template>
  <div class="layout bg-white">
    <div class="box">
      <i class="iconfont icon-404"></i>
      <p>未找到页面</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl"

  .layout
    position absolute
    height 100%
    width 100%
    padding-top 40%

  .box
    text-align center
    i
      height 100%
      line-height 100%
      font-size px2rem(300px)

</style>

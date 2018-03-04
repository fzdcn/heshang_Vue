<template>
  <div>
    <div class="header bg-header">
      <a v-if="backShow" @click="goBack()" href="javascript:" class="left">
        <i class="iconfont icon-back"></i>
      </a>
      <div class="center">
        <img v-if="logoShow" class="logo" src="/static/images/logo.png" alt="分享宝">
        <h1 v-if="!logoShow && (title !== '')" class="title" v-html="title"></h1>
      </div>
    </div>
  </div>
</template>

<script>
  import {goBack} from '../functions'

  export default {
    name: 'Header',
    props: [
      'logoShow', 'backShow', 'deliveryShow', 'title'
    ],
    data () {
      return {
        hasMessage: false
      }
    },
    methods: {
      goBack () {
        goBack()
      }
    }
  }
</script>

<style lang="stylus" scoped>

  @import "../assets/variable.styl"

  .header
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    background-color $red
    color $white
    .left
      float: left
      display: inline-block
      height: $headerHeight
      line-height: $headerHeight
      width: $headerHeight
      text-align: center
      color $white
      .iconfont
        font-size: $fontSizeHuge

    .right
      float: right
      display: inline-block
      height: $headerHeight
      line-height: $headerHeight
      width: $headerHeight
      text-align: center
      .iconfont
        font-size: $fontSizeHuge

    .center
      margin: 0 $headerHeight
      .logo
        width: px2rem(218px)

    .title
      font-size: $fontSizeExtraLarge
      font-weight normal
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

  .icon-message
    position relative

  .message-active:after
    content ''
    width px2rem(12px)
    height px2rem(12px)
    border-radius 50%
    background-color $red
    display inline-block
    position absolute
    top px2rem(-5px)
    right px2rem(-5px)
    color rebeccapurple

</style>

<template>
  <div>
    <AppHeader
      v-if="withHeader"
      :logoShow="logoShow"
      :backShow="backShow"
      :title="title"></AppHeader>
    <div class="content-wrap" :class="(withFooter?'with-footer':'')+' '+(withHeader&&hasTopSpace?'top-space':'')">
      <slot></slot>
      <GoTop :goText="goText"></GoTop>
    </div>
    <AppFooter v-if="withFooter"></AppFooter>
  </div>
</template>

<script>
  import AppHeader from './Header'
  import AppFooter from './Footer'
  import GoTop from './GoTop'

  export default {
    name: 'AppLayout',
    props: {
      withHeader: {
        type: Boolean,
        default: true
      },
      withFooter: {
        type: Boolean,
        default: false
      },
      hasTopSpace: {
        type: Boolean,
        default: false
      },
      logoShow: {
        type: Boolean,
        default: false
      },
      backShow: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      }
    },
    components: {
      AppHeader,
      AppFooter,
      GoTop
    },
    data () {
      return {
        goText: '<i class="iconfont icon-top"></i>'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/variable.styl"

  .content-wrap {
    &.with-footer {
      padding-bottom: $footerHeight;
    }
    &.top-space {
      padding-top: $headFootSpace;
    }
  }
</style>

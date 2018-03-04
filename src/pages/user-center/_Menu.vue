<template>
  <div class=" link-list">
    <div class="detail-item" v-for="(item, index) in menus" :key="index" @click="seeDetail(item.link)">
        <span class="info-left">
          <i class="iconfont" :class="item.icon"></i>{{ item.label }}</span>
      <div class="info-right">
        <i class="iconfont icon-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import {showAlert} from '../../functions'

  export default {
    name: 'UserCenterMenu',
    data () {
      return {
        menus: [
          {label: '咨询客服', icon: 'icon-customer', link: ''},
          {label: '分享好友', icon: 'icon-share', link: {name: 'share', params: {username: this.$store.getters.username}}},
          {label: '我的分润', icon: 'icon-score', link: {name: 'score'}},
          {label: '意见反馈', icon: 'icon-edit', link: ''},
          {label: '推送设置', icon: 'icon-settings', link: ''},
        ]
      }
    },
    methods: {
      seeDetail (link) {
        if (link) {
          this.$router.push(link)
        }else{
          showAlert('开发中', 'info')
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl"

  .link-list
    padding 0 $paddingLarge
    .detail-item
      height px2rem(100px)
      line-height px2rem(100px)
      font-size $fontSizeExtraLarge
      .info-left
        display flex
        align-items center
        .iconfont
          font-size $fontSizeExtraLarge
          margin-right px2rem(20px)

</style>

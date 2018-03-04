<template>
  <div class="list clearfix"
       v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
    <a v-for="item in list" @click="routeTo(item.link)"
       class="item bg-white" :class="{'no-padding-left': !paddingLeft}">
      <div class="pic"><img v-lazy="item.pic"></div>
      <div class="content">
        <div class="name">{{ item.name }}</div>
        <div class="price"><i class="iconfont icon-cny"></i>{{ parseFloat(item.price) }}</div>
        <div class="introduction">{{ item.introduction }}</div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'CourseListItem',
    props: {
      list: {
        /* 字段：link、pic、name、price、introduction */
        type: Array,
        required: true
      },
      loadMore: {
        type: Function,
        required: true
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      paddingLeft: {
        type: Boolean,
        default: true
      },
      replaceRoute: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      routeTo (to) {
        if (!this.replaceRoute) {
          this.$router.push(to)
        } else {
          this.$router.replace(to)
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl"

  .list
    .item
      display flex
      align-items center
      padding $paddingSmall $paddingLarge
      border-bottom 1px solid $grey
      &.no-padding-left
        padding-left 0
        padding-right 0
      .pic
        width px2rem(175px)
        height px2rem(220px)
        img-center('horizon')
      .content
        flex 1
        padding-left $paddingSmall
        .name
          font-size $fontSizeLarge
          font-weight bold
        .price
          color $lightRed
          font-weight bold
        .introduction
          margin-top $paddingExtraSmall
          font-size $fontSizeSmall
          color $darkGrey

</style>

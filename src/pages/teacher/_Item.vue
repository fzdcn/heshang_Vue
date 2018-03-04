<template>
  <div class="list clearfix"
       v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
    <a v-for="item in list" @click="routeTo(item.link)"
       class="item bg-white" :class="{'no-padding-left': !paddingLeft}">
      <div class="pic"><img v-lazy="item.pic"></div>
      <div class="content">
        <div class="name">{{ item.name }}</div>
        <div v-html="item.introduction" class="introduction"></div>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'TeacherListItem',
    props: {
      list: {
        /* 字段：link、pic、name、introduction */
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
      }
    },
    methods: {
      routeTo (to) {
        this.$router.push(to)
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
        .introduction
          margin-top $paddingExtraSmall
          font-size $fontSizeSmall
          color $darkGrey

</style>

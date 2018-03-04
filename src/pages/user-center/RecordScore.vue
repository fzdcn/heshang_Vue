<template>
  <app-layout :title="title">
    <div class="list bg-white"
         v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
      <div class="item header">
        <span>结算时间</span>
        <span>利润</span>
      </div>
      <div v-for="item in list" class="item">
        <span>{{ item.date | moment }}</span>
        <span>{{ item.add }}</span>
      </div>
    </div>
    <data-loading :isLoading="isLoading" :isLoadToEnd="isLoadToEnd"></data-loading>
  </app-layout>
</template>

<script>
  import AppLayout from '../../components/AppLayout'
  import DataLoading from "../../components/DataLoading";

  export default {
    name: 'RecordScore',
    components: {
      DataLoading,
      AppLayout
    },
    data () {
      return {
        title: '我的分润',

        list: [],

        isLoading: false,
        isLoadToEnd: false,

        pagination: {
          total: 0,
          per_page: 10,
          current_page: 0,
          last_page: 0,
        },
      }
    },
    methods: {
      getListParams () {
        return {
          fields: 'id,bdate,bonustotal',
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        }
      },
      getList() {
        return this.$httpGet('bonus-log/list', this.getListParams())
          .then((data) => {
            let items = []
            for (let key of Object.keys(data.data)) {
              let val = data.data[key]
              items.push({
                id: val.id,
                date: val.bdate,
                add: parseFloat(val.bonustotal),
              })
            }
            this.list = this.list.concat(items)
            this.pagination = data.pagination
          })
      },
      loadMore (reload = false) {
        if (reload) {
          this.pagination.current_page = 0
          this.isLoadToEnd = false
          this.list = []
        }
        this.isLoading = true
        this.pagination.current_page += 1
        this.getList().then(() => {
          if (this.pagination.current_page >= this.pagination.last_page) {
            this.isLoadToEnd = true
          } else {
            this.isLoading = false
          }
        })
      },
    },
  }
</script>

<style scoped lang="stylus">

  @import '../../assets/variable.styl'

  .cash
    padding $paddingMedium $paddingSmall

  .list
    .item
      border-top 1px solid $grey
      padding $paddingMedium $paddingSmall
      display flex
      &.header
        font-size $fontSizeMedium
        font-weight bold
      span
        flex 1
        text-align center
</style>

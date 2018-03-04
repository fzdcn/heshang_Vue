<template>
  <app-layout :title="title">
    <div class="cash">钱包：{{cash}}</div>

    <div class="list clearfix"
         v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
      <div v-for="item in list" class="item bg-white">
        <div class="date">{{item.date}}</div>
        <div class="operate">
          {{item.account_type_name}}{{item.type_name}}：
          <span v-if="item.add < 0" class="red">{{item.add}}</span>
          <span v-else class="green">{{'+' + item.add}}</span>
        </div>
        <div class="balance">{{item.account_type_name}}结余：{{item.balance}}</div>
        <div class="remark">备注：{{item.remark}}</div>
      </div>
    </div>
    <data-loading :isLoading="isLoading" :isLoadToEnd="isLoadToEnd"></data-loading>
  </app-layout>
</template>

<script>
  import AppLayout from '../../components/AppLayout'
  import DataLoading from "../../components/DataLoading";

  export default {
    name: 'Cash',
    components: {
      DataLoading,
      AppLayout
    },
    data () {
      return {
        title: '财富中心',

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
    computed: {
      cash () {
        return parseFloat(this.$store.getters.user.M_purse)
      }
    },
    methods: {
      getUserInfo () {
        this.$httpGet('mine/info', {}).then(({data}) => {
          this.$store.dispatch('userUpdate', data)
        })
      },
      getListParams () {
        return {
          fields: 'ID,FF_ODate,FF_Add,FF_Balance,FF_Remark',
          expand: 'account_type_name,type_name',
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        }
      },
      getList() {
        return this.$httpGet('financial/list', this.getListParams())
          .then((data) => {
            let items = []
            for (let key of Object.keys(data.data)) {
              let val = data.data[key]
              items.push({
                id: val.ID,
                date: val.FF_ODate,
                add: parseFloat(val.FF_Add),
                balance: parseFloat(val.FF_Balance),
                remark: val.FF_Remark,
                account_type_name: val.account_type_name,
                type_name: val.type_name,
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
    mounted () {
      this.getUserInfo()
    }
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
      .date
        display inline-block
        border-bottom 1px solid $grey
        color $darkGrey
        font-size $fontSizeSmall
        margin-bottom $paddingExtraSmall
      .remark
        display inline-block
        color $darkGrey
        font-size $fontSizeSmall
        margin-top $paddingExtraSmall
      .operate, .balance
        line-height 1.5
</style>

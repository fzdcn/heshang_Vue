<template>
  <div class="box">
    <course-list-item :list="list" :loadMore="loadMore" :isLoading="isLoading"></course-list-item>
    <data-loading :isLoading="isLoading" :isLoadToEnd="isLoadToEnd"></data-loading>
  </div>
</template>

<script>
  import DataLoading from "../../components/DataLoading"
  import CourseListItem from "../course/_Item";

  export default {
    name: 'AppCourseList',
    components: {
      CourseListItem,
      DataLoading
    },
    data () {
      return {
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
      routeTo (to) {
        this.$router.push(to)
      },
      getListParams () {
        return {
          fields: 'id,course_name,course_price,imglist,course_introduce',
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        }
      },
      getList() {
        return this.$httpGet('course/list', this.getListParams())
          .then((data) => {
            let items = []
            for (let key of Object.keys(data.data)) {
              let val = data.data[key]
              items.push({
                link: {name: 'course-detail', params: {id: val.id}},
                pic: val.imglist ? val.imglist[0] : '',
                name: val.course_name,
                price: val.course_price,
                introduction: val.course_introduce
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
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl"

  .box
    border-top 1px solid $grey

</style>

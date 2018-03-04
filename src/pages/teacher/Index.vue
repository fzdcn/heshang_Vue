<template>
  <app-layout :title="title" :withFooter="true" :backShow="false">
    <teacher-list-item :list="list" :loadMore="loadMore" :isLoading="isLoading"></teacher-list-item>
    <data-loading :isLoading="isLoading" :isLoadToEnd="isLoadToEnd"></data-loading>
  </app-layout>
</template>

<script>
  import DataLoading from "../../components/DataLoading"
  import AppLayout from "../../components/AppLayout";
  import TeacherListItem from "./_Item";

  export default {
    name: 'TeacherIndex',
    components: {
      TeacherListItem,
      AppLayout,
      DataLoading
    },
    data () {
      return {
        title: '全部讲师 <i class="iconfont icon-teacher"></i>',

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
          fields: 'id,img_list,teacher_name,teacher_content',
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        }
      },
      getList() {
        return this.$httpGet('teacher/list', this.getListParams())
          .then((data) => {
            let items = []
            for (let key of Object.keys(data.data)) {
              let val = data.data[key]
              items.push({
                link: {name: 'teacher-detail', params: {id: val.id}},
                pic: val.img_list ? val.img_list[0] : '',
                name: val.teacher_name,
                introduction: val.teacher_content
              })
            }
            this.list = this.list.concat(items)
            console.log(this.list)
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

<template>
  <app-layout :withHeader="false" :withFooter="true">
    <div v-if="teacher">
      <transition name="fade">
        <photo-swiper v-if="teacher.img_list" :pics="teacher.img_list"></photo-swiper>
      </transition>

      <div class="box">
        <div class="top">
          <div class="name">{{teacher.teacher_name}}</div>
        </div>
        <div v-html="teacher.teacher_content" class="more-info image-max-width-100 a-link"></div>
        <div class="more-list">
          <div>
            <span class="btn btn-red bg-box-title">他的课程 <i class="iconfont icon-course"></i></span>
          </div>
          <course-list-item class="no-padding" :list="list" :loadMore="loadMore" :isLoading="isLoading"
                            :paddingLeft="false"></course-list-item>
          <data-loading :isLoading="isLoading" :isLoadToEnd="isLoadToEnd"></data-loading>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
  import AppLayout from "../../components/AppLayout";
  import PhotoSwiper from "../../components/PhotoSwiper";
  import {showAlert} from '../../functions'
  import CourseListItem from "../course/_Item";
  import DataLoading from "../../components/DataLoading";

  export default {
    name: 'TeacherDetail',
    components: {
      DataLoading,
      CourseListItem,
      PhotoSwiper,
      AppLayout
    },
    data () {
      return {
        teacher: '',

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
      id () {
        return this.$route.params.id;
      }
    },
    watch: {
      id () {
        this.getTeacherInfo()
        this.loadMore(true)
      }
    },
    methods: {
      getTeacherInfo () {
        this.$httpGet('teacher/view', {
          id: this.id,
          fields: 'id,img_list,teacher_name,teacher_content',
        }).then(({data}) => {
          this.teacher = data
        })
      },
      pay () {
        showAlert('开发中')
      },
      getListParams () {
        return {
          id: this.id,
          fields: 'id,course_name,course_price,imglist,course_introduce',
          page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        }
      },
      getList() {
        return this.$httpGet('teacher/course-list', this.getListParams())
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
    },
    mounted () {
      this.getTeacherInfo()
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/variable.styl"

  .box
    background-color $white
    .top
      display flex
      align-items center
      padding $paddingMedium
      .name
        width 100%
        font-size $fontSizeHuge
        font-weight bold

    .more-info
      padding $paddingMedium
      border-top 1px solid $grey

    .more-list
      padding $paddingMedium
      border-top 1px solid $grey
</style>

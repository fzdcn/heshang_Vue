<template>
  <app-layout :withHeader="false" :withFooter="true">
    <div v-if="course">
      <transition name="fade">
        <photo-swiper v-if="course.imglist" :pics="course.imglist"></photo-swiper>
      </transition>

      <div class="box">
        <div class="top">
          <div class="name">{{course.course_name}}</div>
          <div v-if="!course.has_bought" @click="pay()" class="pay btn btn-red btn-lg bg-menu-2">
            立即预约 <i class="iconfont icon-pencil"></i>
          </div>
          <div class="pay btn btn-red btn-lg bg-menu-2" v-else>已购买 <i class="iconfont icon-book"></i></div>
        </div>
        <div v-html="course.course_content" class="more-info image-max-width-100 a-link"></div>
        <div class="more-list">
          <div>
            <span class="btn btn-red bg-box-title">更多课程 <i class="iconfont icon-course"></i></span>
          </div>
          <course-list-item class="no-padding" :list="list" :loadMore="loadMore" :isLoading="isLoading"
                            :paddingLeft="false" :replaceRoute="true"></course-list-item>
          <data-loading :isLoading="isLoading" :isLoadToEnd="isLoadToEnd"></data-loading>
        </div>
      </div>
    </div>

    <div v-if="payReturnHtml" v-html="payReturnHtml"></div>
  </app-layout>
</template>

<script>
  import AppLayout from "../../components/AppLayout";
  import PhotoSwiper from "../../components/PhotoSwiper";
  import {showAlert} from '../../functions'
  import CourseListItem from "./_Item";
  import DataLoading from "../../components/DataLoading";

  export default {
    name: 'CourseDetail',
    components: {
      DataLoading,
      CourseListItem,
      PhotoSwiper,
      AppLayout
    },
    data () {
      return {
        course: '',

        list: [],

        isLoading: false,
        isLoadToEnd: false,

        pagination: {
          total: 0,
          per_page: 10,
          current_page: 0,
          last_page: 0,
        },

        payReturnHtml: null
      }
    },
    computed: {
      id () {
        return this.$route.params.id;
      }
    },
    watch: {
      id () {
        this.getCourseInfo()
        this.loadMore(true)
      }
    },
    methods: {
      getCourseInfo () {
        this.$httpGet('course/view', {
          id: this.id,
          fields: 'id,imglist,course_name,course_content',
          expand: 'has_bought',
        }).then(({data}) => {
          this.course = data
        })
      },
      pay () {
        this.$httpPost('order/create', {
          id: this.id
        }).then(({data}) => {
          let form = document.createElement('form')
          document.body.appendChild(form)
          form.method = data.method
          form.action = data.action
          for (let key of Object.keys(data.params)) {
            let val = data.params[key]
            let input = document.createElement('input')
            input.setAttribute('name', key)
            input.setAttribute('type', 'hidden')
            input.setAttribute('value', val)
            form.appendChild(input)
          }
          form.submit()
        })
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
        return this.$httpGet('course/relative-list', this.getListParams())
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
      this.getCourseInfo()
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
        width 50%
        font-size $fontSizeHuge
        font-weight bold
      .pay
        flex 1

    .more-info
      padding $paddingMedium
      border-top 1px solid $grey

    .more-list
      padding $paddingMedium
      border-top 1px solid $grey
</style>

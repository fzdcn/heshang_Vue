<template>
  <AppLayout
    :withHeader="false"
    :withFooter="true"
    :logoShow="true"
    :backShow="false"
  >
    <transition name="fade">
      <BannerSwiper></BannerSwiper>
    </transition>

    <app-menu></app-menu>

    <app-course-list></app-course-list>
  </AppLayout>
</template>

<script>
  import AppLayout from '../../components/AppLayout'
  import BannerSwiper from './_BannerSwiper'
  import AppMenu from './_Menu'
  import AppCourseList from "./_CourseList";

  export default {
    name: 'Home',
    components: {
      AppCourseList,
      AppLayout,
      BannerSwiper,
      AppMenu,
    }
  }
</script>

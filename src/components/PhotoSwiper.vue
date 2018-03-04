<template>
  <div v-if="Object.keys(pics).length>0">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(pic, index) in pics" :key="index" class="image-container">
        <img :src="pic">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'PhotoSwiper',
    components: {
      swiper,
      swiperSlide
    },
    props: {
      pics: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          pagination: '.swiper-pagination',
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../assets/variable.styl"

  .image-container
    height 100%
</style>

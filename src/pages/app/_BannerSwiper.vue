<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(banner, index) in banners" :key="index">
      <a v-if="banner.src" @click="toRoute(banner.src)"><img :src="banner.img"></a>
      <img v-else :src="banner.img">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'BannerSwiper',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        banners: [
          {src: '', img: '/static/images/app-banner-1.jpg'},
          {src: '', img: '/static/images/app-banner-2.jpg'},
          {src: '', img: '/static/images/app-banner-3.jpg'},
        ],
        swiperOption: {
          autoplay: 3000,
          loop: true,
          pagination: '.swiper-pagination',
        }
      }
    },
    methods: {
      toRoute (href) {
        if (!/^http/.test(href)) {
          this.$router.push({path: href})
        } else {
          window.location.href = href
        }
      }
    }
  }
</script>

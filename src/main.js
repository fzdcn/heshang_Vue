// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
import http from './plugins/http'
import localStorage from './plugins/localStorage'
import moment from 'moment'
import store from './store'
import VueLazyload from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import {QI_NIU_CDN_DOMAIN} from './config/const'
require('swiper/dist/css/swiper.min.css')

Vue.config.productionTip = false

Vue.use(http)
Vue.use(localStorage)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/images/lazy-load.png',
  loading: '/static/images/lazy-load.png',
  attempt: 2,
  filter: {
    webp (listener, options){
      if (options.supportWebp) {
        const isCDN = new RegExp('/' + QI_NIU_CDN_DOMAIN + '/')
        if (isCDN.test(listener.src)) {
          listener.src += '?imageslim&imageView2/2/format/webp'
        }
      }
    }
  },
})

Vue.use(InfiniteScroll)

Vue.filter('moment', function (value, formatString = 'YYYY-MM-DD HH:mm:ss') {
  return moment(value * 1000).format(formatString)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
  mounted() {
    const childElem = document.getElementById('loader')
    childElem.parentNode.removeChild(childElem)
  },
})

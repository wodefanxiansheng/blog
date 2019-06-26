// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios'
import Vuex from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import store from './store/store.js'
import './assets/css/common.css'
// import 'swiper/dist/css/swiper.min.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import VueProgressBar from 'vue-progressbar'
import returnTop from './components/returnTop'
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(infiniteScroll)
Vue.prototype.$http = axios
Vue.use(VueVideoPlayer)
Vue.component('return-top',returnTop)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '4px'
})
Vue.use(require('vue-wechat-title'))//设置title
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import "babel-polyfill"//必须放在main。js头部，兼容ie浏览器
import Vue from 'vue'
import App from './App'
// import router from './router'
import router from './router/permission'
import store from './store'//引入vuex
// 样式
import  './assets/css/reset.css'
import  './assets/css/admin.css'
import './assets/less/variables.less'//全局引入需要引入一个插件npm install sass-resources-loader --save-dev
// elementUi样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'//icon
import axios from 'axios'
import title from './components/title'
import mavonEditor from 'mavon-editor'//markdown
import 'mavon-editor/dist/css/index.css'//markdown

import VueVideoPlayer from 'vue-video-player'//video
import 'video.js/dist/video-js.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('title-m',title)
Vue.use(mavonEditor)//markdown使用
Vue.use(VueVideoPlayer)//video

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

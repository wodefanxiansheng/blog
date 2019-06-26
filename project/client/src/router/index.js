import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Technology from '@/views/technology/technology'
import Details from '@/views/details/details'
import Diary from '@/views/diary/diary'
import Me from '@/views/me/me'
import Message from '@/views/message/message'
// import Music from '@/views/music/music'
import Navigation from '@/views/navigation/navigation'
Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect:'/Home',//重定向
      meta:{
        title:'凡先生,欢迎来到Mr.fan的博客'
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta:{
        title:'凡先生,欢迎来到Mr.fan的博客'
      }
    },
    {
      path: '/Technology',
      name: 'Technology',
      component: Technology,
      meta:{
        title:'前端文章'
      }
    },
    {
      path: '/Home/:id',
      name: 'Details',
      component: Details,
      meta:{
        title:'文章详情'
      }
    },
    {
      path: '/Diary',
      name: 'Diary',
      component: Diary,
      meta:{
        title:'心情分享'
      }
    },
    {
      path: '/Me',
      name: 'Me',
      component: Me,
      meta:{
        title:'关于我'
      }
    },
    {
      path: '/Message',
      name: 'Message',
      component: Message,
      meta:{
        title:'留言墙'
      }
    },
    // {
    //   path: '/Music',
    //   name: 'Music',
    //   component: Music,
    //   meta:{
    //     title:'我的音乐'
    //   }
    // },
    {
      path: '/Navigation',
      name: 'Navigation',
      component: Navigation,
      meta:{
        title:'导航'
      }
    }
  ]
})

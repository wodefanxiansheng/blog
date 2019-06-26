import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/layout'

/*路由
这里的路由分为两种，constantRouterMap 和 asyncRouterMap。
constantRouterMap： 代表那些不需要动态判断权限的路由，如登录页、404、等通用页面。(静态路由)
asyncRouterMap： 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面。（动态路由）*/
// 路由懒加载
export const constantRouterMap = [
    {
      path: '/login',
      name:'登录',
      component: () => import('@/views/login/index'),
      sortNumber:-1,
      hidden:true////当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    },
    {
      path:'/',
      name:'首页',
      component:Layout,
      redirect:'/home',
      icon:'home',
      hidden:false,
      sortNumber:0,
      children:[
        {
          path:'home',
          component:() => import('@/views/home/index'),
          name:'首页',
        }
      ]
    },
    {
      path: '/404',
      name:'404',
      component: () => import('@/views/404/404'),
      hidden: true
    },
    // {
    //   path:'https://github.com/PanJiaChen/vue-element-admin',
    //   outUrl:true,
    //   name:'github',
    //   component:Layout,
    //   icon:'github',
    //   hidden:false,
    //   sortNumber:2,
    //   children:[
    //     {
    //       path:'',
    //       name:'github',
    //     }
    //   ]
    // }
]
export const asyncRouterMap = [
  {
    path:'/permission',
    name:'权限管理',
    component:Layout,
    meta:{role:['admin']},
    redirect:'/permission/list',
    requireAuth: true, // 是否需要登录
    dropdown: true,
    hidden:false,
    icon: 'permission',
    sortNumber:1,
    children:[
        { path: 'list',component:() => import('@/views/permission/list/index'), name: '管理员列表' },
        { path: 'add', component:() => import('@/views/permission/add/index'), name: '添加管理员' },
        { path: 'role', component:() => import('@/views/permission/role/index'), name: '角色权限' },
    ]
  },
  {
    path:'/article',
    name:'文章管理',
    meta:{role:['admin','general']},
    component:Layout,
    redirect:'/article/list',
    dropdown:true,
    hidden:false,
    icon:'article_g',
    sortNumber:3,
    children: [
        { path: 'list', component:() => import('@/views/article/list/index'), name: '文章列表' },
        { path: 'add', component:() => import('@/views/article/add/index'), name: '添加文章' },
        { path: 'addClass', component:() => import('@/views/article/addClass/index'), name: '文章分类' },
        { path: 'preview/:id',hidden:true, component:() => import('@/views/article/preview/index'), name: '文章预览'},
        { path: 'edit/:id',hidden:true, component:() => import('@/views/article/edit/index'), name: '文章编辑'}
    ]
  },
  {
    path:'/video',
    name:'视频管理',
    meta:{role:['admin']},
    component:Layout,
    redirect:'/video/list',
    dropdown:true,
    hidden:false,
    icon:'video',
    sortNumber:3,
    children: [
        { path: 'uploadVideo', component:() => import('@/views/video/uploadVideo'), name: '添加视频' },
        { path: 'videoList', component:() => import('@/views/video/videoList'), name: '视频列表' },
        { path: 'editVideo/:id',hidden:true, component:() => import('@/views/video/editVideo'), name: '文章编辑'}

    ]
  },
  {
    path:'/dashboard',
    name:'矢量图形库',
    component:Layout,
    redirect:'/dashboard/index',
    dropdown:true,
    hidden:false,
    icon:'echarts',
    sortNumber:4,
    children: [
        { path: 'index', component:() => import('@/views/dashboard/index'), name: 'dashboard' },
    ]
  },
  {
    path:'/comments',
    name:'留言墙评论',
    component:Layout,
    redirect:'/comments/list',
    dropdown:true,
    hidden:false,
    icon:'comments',
    sortNumber:4,
    children: [
        { path: 'list', component:() => import('@/views/comments/list/index'), name: '评论列表' },
        { path: 'add', component:() => import('@/views/comments/add/index'), name: '添加评论' },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    routes: constantRouterMap
})
























// {
//   path: '/vueStudy',
//   component: Layout,
//   redirect: '/vueStudy/index',
//   meta: {
//     title: 'vueStudy',
//     icon: 'lock',
//     roles: ['admin', 'editor']
//   },
//   children: [
//     {
//       path: 'components-dynamic-async',
//       component: () => import('@/views/vueStudy/components-dynamic-async'),
//       name: '动态组件',
//     },
//     {
//       path: 'transition',
//       component: () => import('@/views/vueStudy/transition'),
//       name: 'transition',
//     },
//   ]
// }
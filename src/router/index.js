import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {getToken} from '@/request/token'

Vue.use(Router)
 
const router =  new Router({
  routes: [
    {
      path: '/admin/login',
      component: () => import ('@/views/admin/login')
    },
    {
      path: '/warnPage',
      component: () => import ('@/views/common/404')
    },
    {
      path: '',
      component: () => import ('@/Home'),
      meta:{
        requireLogin:true
      },
      children: [
        {
          path: '/', 
          component: () => import ('@/views/index'),
          meta:{
            requireLogin:true
          },
          children:[
            {
              path: '/system/user',
              component: () => import ('@/views/userView'),
              meta:{
                requireLogin:true
              }
            },
            {
              path: '/system/article',
              component: () => import ('@/views/articleView'),
              meta:{
                requireLogin:true
              }
            },
            {
              path: '/system/exam',
              component: () => import ('@/views/examView'),
              meta:{
                requireLogin:true
              }
            },
            {
              path: '/system/role',
              component: () => import ('@/views/roleView'),
              meta:{
                requireLogin:true
              }
            },
            {
              path: '/system/menu',
              component: () => import ('@/views/menuView'),
              meta:{
                requireLogin:true
              }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  if(getToken()) {
    if(to.path === '/login') {
      // next({ path: '/'});
      next();
    }else {
      next();
    }
  }else {
    if(to.meta.requireLogin) {
        next( {path:'/admin/login'} )
        console.log(to.fullPath);
    }else {
      next();
    }
  }
})


export default router;



import Vue from 'vue'
import Router from 'vue-router'
import Hot from '../components/Hot.vue'
import Cinema from '../components/Cinema.vue'
import Film from '../components/Film.vue'
import Coming from '../components/Coming.vue'
import ZiXun from '../components/ZiXun.vue'
import CinemaDetail from '../components/CinemaDetail.vue'
import SubmitOrder from '../components/SubmitOrder.vue'
import My from '../components/My.vue'
import MyOrderList from '../components/MyOrderList.vue'
import Login from '../components/Login.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {path: '/', redirect: '/dianying'},
    {path: '/dianying',redirect:'/dianying/hot', component: Film, children:[
      {path: 'hot',component:Hot},
      {path: 'coming',component:Coming}
    ]},
    {path: '/yingyuan',component: Cinema},
    {path: '/zixun', component: ZiXun },
    {path: '/yingyuan/detail/:id', component: CinemaDetail },
    {path: '/order/:id', component: SubmitOrder},
    {path: '/my', component: My},
    {path: '/MyOrderList', component:MyOrderList},
    {path: '/login',component: Login},
    {path: '/search', component:Search}

  ],
  mode:'history'
})

// 挂载路由全局导航守卫
router.beforeEach((to, from, next) => {
  if(to.path == '/login') {
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  
  if(to.path == '/my') {
    if(!token) {
      return next('/login')
    }
    return next()
  }
  next()
})

export default router

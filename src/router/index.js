import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import home from '@/components/home/home.vue'
import users from '@/components/users/user.vue'
import Right from '@/components/rights/right.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      children:[
        {
          name:'users',
          path:'/users',
          component:users
        }, {
          name:'right',
          path:'/rights',
          component:Right
        }
      ],
      path: '/home',
      name: 'home',
      component: home
   
    }
  ]
})

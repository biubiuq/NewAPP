import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import home from '@/components/home/home.vue'
import users from '@/components/users/user.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import redirect from '@/components/home.vue'
import vuexhome from '@/components/Vuex/home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'redirect',
      component:redirect
    },
    {
      path:'/vuexhome',
      name:'vuexhome',
      component:vuexhome
    },
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
        },
        {
          name:'role',
          path:'/role',
          component:Role
        }
      ],
      path: '/home',
      name: 'home',
      component: home
   
    }
  ],
  mode:'history'
})

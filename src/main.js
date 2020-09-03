// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
///MyBread 其实是组件选项所在的对象
import MyBread from '@/components/coscom/myBread.vue'
import router from './router'
import ElementUI from 'element-ui';
import myServerhttp from '@/plugins/http.js'
import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
///为什么不能这样用,因为不是vue插件
///但是我又想这样使用
Vue.use(ElementUI);
///自定义插件
Vue.use(myServerhttp);
/* eslint-disable no-new */
////全局过滤器，处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD');
})
////全局自定义组件
Vue.component('my-Bread',
  MyBread
)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

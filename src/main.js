// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

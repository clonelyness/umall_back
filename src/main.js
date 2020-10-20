// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1.把reset引入
import './assets/css/reset.css'

// 2.引入公共组件管理文件(componets/index.js)
import './components'
 
// 5.引入过滤器管理文件 
import './filters'

//6.引入vuex仓库
import store from "./store" 

//7.element-ui引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

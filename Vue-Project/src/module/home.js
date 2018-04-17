import home from '../home'
import Vue from 'vue'
//axios方法引入
import { post,get } from '../axios/config'
import router from '../router/home-router'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.config.productionTip = false
import store from '../vuex/store'
/* eslint-disable no-new */
new Vue({
  el: '#home',
  render: h => h(home),
  store,
  router,
   beforeMount(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 / 2 + 'px'
  		//alert( document.documentElement.clientWidth)
  		
  }
})
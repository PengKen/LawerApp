import personal from '../personal'
import Vue from 'vue'
//axios方法引入
import { post,get } from '../axios/config'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.config.productionTip = false
import store from '../vuex/personal-store'
import router from '../router/personal-router.js'
/* eslint-disable no-new */
new Vue({
  el: '#personal',
  render: h => h(personal),
  store,
  router,
   beforeMount(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 / 2 + 'px'
  		//alert( document.documentElement.clientWidth)
  		
  }
})
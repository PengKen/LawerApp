import login from '../login'
import Vue from 'vue'
import router from '../router/login_router'

//axios方法引入
import { post,get } from '../axios/config'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$indexPage = {
	index:null
}
Vue.config.productionTip = false
 import { Picker,Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
import store from '../vuex/store'
/* eslint-disable no-new */

new Vue({
  el: '#login',
  render: h => h(login),
  router,
  store,
   beforeMount(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 / 2 + 'px'
  		//alert( document.documentElement.clientWidth)
  		
  }
})
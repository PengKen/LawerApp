import commentDetail from '../commentDetail'
import Vue from 'vue'
import store from '../vuex/onlook-store.js'
import { post,get } from '../axios/config'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.config.productionTip = false
import 'mint-ui/lib/style.css'
import router from '../router/comment-detail'
/* eslint-disable no-new */
new Vue({
  el: '#commentDetail',
  render: h => h(commentDetail),
   beforeMount(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 / 2 + 'px'
  		//alert( document.documentElement.clientWidth)
  },
  router,
  store
  
})


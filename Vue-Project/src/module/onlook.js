import onlook from '../onlook'
import Vue from 'vue'
import router from '../router/onlook-router'
import store from '../vuex/onlook-store'
//axios方法引入
import { post,get } from '../axios/config'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.config.productionTip = false
import 'mint-ui/lib/style.css'
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
/* eslint-disable no-new */
new Vue({
  el: '#onlook',
  render: h => h(onlook),
  store,
  router,
   beforeMount(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 / 2 + 'px'
  		//alert( document.documentElement.clientWidth)
  },
  created () {	
//		this.$post('/HotTopics.do').then((response) => {
//			console.log(response);
//			this.$store.commit("newOnlookItems",response);
//		}).catch((err) => {
//			console.log("HotTopics.do error " + err); 
//		})
  }
})






//items:[
//		{
//			question:{
//				id:'',
//				content:'',
//				.....
//			},
//			answer:{
//				id:'',
//				content:'',
//				......
//			},
//			comments:{
//				userid:{
//					username:'',
//					content:'',
//					likes:''
//					beCommented:{
//						userid:{
//							username:'',
//							content:'',
//							.....
//						},
//						userid:{
//							username:'',
//							content:'',
//							.....
//						}
//						........
//					}
//				}
//			}
//		}
//]

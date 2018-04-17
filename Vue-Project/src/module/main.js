// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
import router from '../router'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import store from '../vuex/store'
// UI 组件引入
//import { Tabbar, TabItem,TabContainer, TabContainerItem,Cell,Button,Field,Spinner } from 'mint-ui';
//Vue.component(Tabbar.name, Tabbar);
//Vue.component(TabItem.name, TabItem);
//Vue.component(TabContainer.name, TabContainer);
//Vue.component(TabContainerItem.name, TabContainerItem);
//Vue.component(Cell.name,Cell);
//Vue.component(Button.name,Button);
//Vue.component(Field.name,Field);
//Vue.component(Spinner.name,Spinner);
Vue.config.productionTip = false

//axios方法引入
import { post,get } from '../axios/config'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeMount(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 / 2 + 'px'
  		//alert( document.documentElement.clientWidth)
  		
  },
  mounted () {
    			
  }
  	
  
  	
  
})

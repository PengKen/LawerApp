import Vue from 'vue'
import Router from 'vue-router'
import commentDetail from '@/components/commentDetail/commentDetail'
import recomment from '@/components/recomment/recomment'
import login from '@/components/login/login'
Vue.use(Router)

export default new Router({
  routes: [
  		
	    {	/*
	       	* 重定向：默认情况下就将路由连接值goods组件，（包括找不到指定的url都会定向到这里来）
	       	*/
	 		path: '/',
	  		redirect: '/commentDetail'
	    },
   		{
	    		path: '/commentDetail',
	    		name:'commentDetail',
	    		meta:{ index:1 },
	    		component: commentDetail
   		 },
   		 {
   		 	name:"recomment",
	    		path: '/recomment',
	    		meta:{ index:2 },
	    		component: recomment
   		 }, 
   		 {
   		 	name:"login",
	    		path: '/login',
	    		meta:{ index:1 },
	    		component: login
   		 }
   		 
 	]
 })

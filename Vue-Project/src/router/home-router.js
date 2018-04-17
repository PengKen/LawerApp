import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import consult from '@/components/home/consult'

Vue.use(Router)

export default new Router({
  routes: [
  		
	    {	/*
	       	* 重定向：默认情况下就将路由连接值goods组件，（包括找不到指定的url都会定向到这里来）
	       	*/
	 		path: '/',
	  		redirect: '/home'
	    },
   		{
	    		path: '/consult',
	    		name:'consult',
	    		component: consult
   		 },
   		 {
   		 	name:"home",
	    		path: '/home',
	    		component: home
   		 }
 	]
 })

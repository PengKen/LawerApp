import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import findpwd from '@/components/findpwd/findpwd'
import register from '@/components/register/register'
import test from '@/components/test/test'

Vue.use(Router)

export default new Router({
  routes: [
  		
	    {	/*
	       	* 重定向：默认情况下就将路由连接值goods组件，（包括找不到指定的url都会定向到这里来）
	       	*/
	 		path: '/',
	  		redirect: '/login'
	    },
   		{
	    		path: '/login',
	    		component: login
//	    		children:[
//					    	{	
//						   path: 'register',
//						   name: 'register',
//						   component: register
//						 },
//						
//						
//	    		
//	    		]
   	 },
 	{
	   path: '/register',
	   name: 'register',
	   component: register
	},
	 {
    		path: '/findpwd',
    		name: 'findpwd',
    		component: findpwd
     }
	 
	]
 })

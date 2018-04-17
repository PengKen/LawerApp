import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
  		
//	    {	/*
//	       	* 重定向：默认情况下就将路由连接值goods组件，（包括找不到指定的url都会定向到这里来）
//	       	*/
//	 		path: '/',
//	  		redirect: '/login'
//	    },
// 		{
//	    		path: '/login',
//	    		component: login
// 	    },
   	   
   	    
// 	    {
// 	    		path: '/main',
//	    		component: main,
//	    		children:[
//	    			{
//		   	    		path: 'personal',
//			    		name: 'personal',
//			    		component: personal
//		   	   },
//		   	    {
//			    		path: 'home',
//			    		name: 'home',
//			    		component: home
//		   	    },
//		   	    {
//			    		path: 'listview',
//			    		name: 'listview',
//			    		component: listview
//		   	    },
//		   	    
//		   	    {
//		   	    		path: 'onlook',
//		   	    		name: 'onlook',
//		   	    		component: onlook
//		   	    		
//		   	    }
////		   	   
////				   	   
//	    		]
// 	    }
//		{
//		   path: '/register',
//		   name: 'register',
//		   component: register
//		 },
//		
//		 {
// 	    		path: '/detail',
//	    		name: 'detail',
//	    		component:detail
// 	    }
// 	    
   ]
 })

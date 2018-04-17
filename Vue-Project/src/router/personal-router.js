import Vue from 'vue'
import Router from 'vue-router'
import personal from '@/components/personal/personal'
import changepwd from '@/components/personal/changepwd'
import inputNewPwd from '@/components/personal/inputNewPwd'
import contactUs from '@/components/personal/contactUs'
import showCollection from '@/components/personal/showCollection'
import collectDetail from '@/components/personal/collectDetail'
import commentItem from '@/components/commentItem/commentItem'
import aboutUs from '@/components/personal/aboutUs'
aboutUs
Vue.use(Router)

export default new Router({
  routes: [
  		{
  			path:'/',
  			meta:{
  				index:1
  			},
  			component: personal
  		},
  		{
	    		path: '/changepwd',
		   name: 'changepwd',
		   meta:{
  				index:2
  			},
		   component: changepwd
		 },
		 {
	    		path: '/inputnewpwd',
		   name: 'inputNewPwd',
		   meta:{
  				index:3
  			},
		   component: inputNewPwd
		 },
		 {
	    		path: '/contactUs',
		   name: 'contactUs',
		   meta:{
  				index:2
  			},
		   component:contactUs
		 },
		 {
	    		path: '/aboutUs',
		   name: 'aboutUs',
		   meta:{
  				index:2
  			},
		   component:aboutUs
		 },
		 {
	    		path: '/showCollection',
		   name: 'showCollection',
		   meta:{
  				index:2
  			},
  			children:[
  				
  			],
		   component:showCollection
		 },
		 {
		 	path:'/collectDetail',
		 	name:'collectDetail',
		 	meta:{
  				index:3
  			},
		 	component:collectDetail,
		 	children:[
		 		{
		 			path:'commentItem',
		 			name:'commentItem',
		 			meta:{
		 				index:998
		 			},
		 			component:commentItem
		 		}
		 	]
		 }
		 
		 
   	]
 })

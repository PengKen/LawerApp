import Vue from 'vue'
import Router from 'vue-router'

import onlook from '@/components/onlook/onlook'
import onlookItem from '@/components/onlookItem/onlookItem'
import commentItem from '@/components/commentItem/commentItem'
Vue.use(Router)

export default new Router({
	routes:[
		{
			path: '/',
			component: onlook
		},
		{
			path: '/onlook',
			name: 'onlook',
			component: onlook
		},
		{
			path: '/onlookItem',
			name: 'onlookItem',
			component: onlookItem
		}
		
	]
})

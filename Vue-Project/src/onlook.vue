<template>
	<div id="onlook">
		<header class="mui-bar mui-bar-nav" >
			
			<h1 id="title" class="mui-title">围观</h1>
		</header>
		<div class="mui-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import onlookItem from './components/onlookItem/onlookItem'
	import onlook from './components/onlook/onlook'
	export default{
		components:{
			'onlookItem': onlookItem
		},
		mounted () {
			let _this = this;
//			document.addEventListener('getUserInfo',function(event){	
//					_this.$store.commit('newUserInfo',event.detail.userInfo);
//					console.log(_this.$store.state.userInfo.token);
//				})
		}
	}
	
</script>

<style>
</style>
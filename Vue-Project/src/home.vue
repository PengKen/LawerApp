<template>
	<div id="home">
		<router-view></router-view>
	</div>
</template>

<script>
	import home from './components/home/home'
	export default{
		components:{
			'home': home
		}
	}
</script>

<style>
	#home,body,html{
		height: 100%;
	}
</style>
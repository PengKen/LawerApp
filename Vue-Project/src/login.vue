<template>
	<div id="login">
		<router-view></router-view>
	</div>
</template>

<script>
	import login from './components/login/login'
	import 'mint-ui/lib/style.css'

	
		
	export default {
		components: {"login": login
			}
		}
</script>

<style>
		#login{
			height: 100%;
		}
</style>
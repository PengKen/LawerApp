<template>
	<div id="personal">
		<transition :name="transitionName">
			<router-view></router-view>
		</transition>

	</div>
</template>

<script>
	import personal from './components/personal/personal'
	export default {
		components: {
			'personal': personal
		},
		data() {
			return {
				transitionName: ''
			}
		},
		mounted() {
			//				let _this = this;
			//				document.addEventListener('getUserInfo',function(event){	
			//					_this.$store.commit('newUserInfo',event.detail.userInfo);
			//					console.log(_this.$store.state.userInfo.token);
			//				})
		},
		watch: {
			$route(to, from) {
				if(to.meta.index === 998) return;
				if(to.meta.index > from.meta.index) {
					this.transitionName = 'slide-left';
				} else {

					this.transitionName = 'slide-right';
				}
				if(to.meta.index != 1) {
					mui.plusReady(function() {
						plus.webview.currentWebview().setStyle({
							bottom: "0"
						})
					})
				}else{
					mui.plusReady(function() {
						plus.webview.currentWebview().setStyle({
							bottom: "51px"
						})
					})
				}
			}
		}
	}
</script>

<style>
	.slide-left-leave-active,
	.slide-right-leave-active {
		will-change: transform;
		transition: all 500ms;
		position: absolute !important;
	}
	
	.slide-right-enter-active,
	/*.slide-right-leave-active,*/
	
	.slide-left-enter-active
	/*,
.slide-left-leave-active */
	
	{
		will-change: transform;
		/*will-change 会随过渡结束后整个类被移除的时候而被解绑，避免了过多cpu的浪费*/
		transition: all 500ms;
		position: absolute !important;
	}
	
	.slide-right-enter {
		/*定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。 
   * 只应用了一帧就被删除，肉眼看不出来透明度发生了变化
   * 即只有在第一帧的时候透明度为0，但也因此引发了过渡
   * translate同理
   * */
		transform: translate3d(-100%, 0, 0);
	}
	
	.slide-right-leave-active {
		transform: translate3d(100%, 0, 0);
	}
	
	.slide-left-enter {
		transform: translate3d(100%, 0, 0);
	}
	
	.slide-left-leave-active {
		transform: translate3d(-100%, 0, 0);
	}
	
	#personal {
		position: relative;
	}
</style>
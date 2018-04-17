<template>
	<div class="comment-detail">
	
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
		
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import commentItem from './components/commentItem/commentItem'
	
	export default{
		data () {
			return {
				transitionName:''
			}
		},
		watch:{
  			$route(to,from,next){
  			 if(to.meta.index > from.meta.index){
       	 //设置动画名称
      	  	this.transitionName = 'slide-left';
    		  }else{
       	 	this.transitionName = 'slide-right';
      }
  		}
  }
	}	
</script>

<style>
		/*路由切换动画*/
		
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  /*will-change 会随过渡结束后整个类被移除的时候而被解绑，避免了过多cpu的浪费*/
  transition: all 500ms;
  position: absolute !important;
}
.slide-right-enter {
  opacity: 0;
  /*定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。 
   * 只应用了一帧就被删除，肉眼看不出来透明度发生了变化
   * 即只有在第一帧的时候透明度为0，但也因此引发了过渡
   * translate同理
   * */
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
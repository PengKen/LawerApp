<template>
	<div id="feedback" class="mui-page feedback">
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
				<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @tap="backToPersonal">
					<span class="mui-icon mui-icon-left-nav"></span>
				</button>
				<button id="submit" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @tap="sendFeedback">发送</button>
				<h1 class="mui-center mui-title">联系我们</h1>
			</div>
			<div class="mui-content">
				
				<div class="row mui-input-row ">
					<textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
				</div>
				<p>QQ/邮箱</p>
				<div class="mui-input-row">
					<input id='contact' type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
				</div>
				<div class="mui-content-padded">
					<div class="mui-inline">应用评分</div>
					<div class="icons mui-inline" style="margin-left: 6px;">
						<i data-index="1" class="mui-icon mui-icon-star"></i>
						<i data-index="2" class="mui-icon mui-icon-star"></i>
						<i data-index="3" class="mui-icon mui-icon-star"></i>
						<i data-index="4" class="mui-icon mui-icon-star"></i>
						<i data-index="5" class="mui-icon mui-icon-star"></i>
					</div>
				</div>
				<br />
			</div>
		</div>
</template>
<!--<script src="../../../static/js/feedback.js"></script>-->
<script>
	export default {
	mounted() {
		mui('.icons').on('tap', 'i', function() {
			var index = parseInt(this.getAttribute("data-index"));
			var parent = this.parentNode;
			var children = parent.children;
			if(this.classList.contains("mui-icon-star")) {
				for(var i = 0; i < index; i++) {
					children[i].classList.remove('mui-icon-star');
					children[i].classList.add('mui-icon-star-filled');
				}
			} else {
				for(var i = index; i < 5; i++) {
					children[i].classList.add('mui-icon-star')
					children[i].classList.remove('mui-icon-star-filled')
				}
			}
			//	  	starIndex = index;
		});
	},
	methods:{
		sendFeedback () {
			if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
				return mui.toast("连接网络失败，请稍后再试");
			}
			if(document.getElementById("question").value === ""){
				mui.toast("请先填写建议");
				return;
			}
			mui.toast("感谢您宝贵的建议！");
			document.getElementById("question").value = ""
			document.getElementById("contact").value = "";
			var icons = document.getElementsByTagName("i");
			console.log(typeof icons)
			for(let index = 0; index < icons.length; index++){
				if(icons[index].classList.contains("mui-icon-star-filled")){
					icons[index].classList.remove("mui-icon-star-filled");
					icons[index].classList.add("mui-icon-star");
				}
			}
		},
		backToPersonal () {
			this.$router.replace("/");
		}
	}
}</script>

<style>
	
</style>
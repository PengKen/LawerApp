<template>
	<div class="consult">
		<div id="feedback" class="mui-page feedback">
			<div class="mui-navbar-inner mui-bar mui-bar-nav">
				<button type="button" @tap="backToHome" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
					<span class="mui-icon mui-icon-left-nav" style="color: white;"></span>
				</button>
				<button id="submit" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" style="color: white;">发送</button>
				<h1 class="mui-center mui-title">问题反馈</h1>
			</div>
			<div class="mui-page-content">
				
				<div class="row mui-input-row">
					<textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见,不少于20个字..."></textarea>
				</div>
				<p style="font-family:Arial;">图片(选填,提供问题截图,总大小10M以下)</p>
				<div id="image-list" class="row image-list">
			  </div>
				<p>邮箱</p>
				<div class="mui-input-row">
					<input id='contact' type="email" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
				</div>
			</div>
		</div>

		
	</div>
</template>


<script>
	import { feedback } from './js/feedback.js'
	
		export default{
			data () {
				return {
					kind: ''
				}
			},
			computed:{
				userInfo(){
					return this.$store.state.userInfo;
				}
			},
			mounted () {
				let _this = this;
				_this.kind = _this.$route.params.kind;
				
				feedback((images,content) => {
					
					console.log("contententer " + content);
					this.$post('./InsertQuestion.do',{
						content:content,
						userid:this.userInfo.userID,
						images:images,
						username:this.userInfo.userName,
						description:this.kind
						
					}).then((response) =>{
						console.log("response " + response);
					}).catch((err) => {
						console.log("err " + err);
					})
				});
			},
			methods:{
				backToHome () {
					this.$router.replace({
							name: 'home',
							params: {
								toggleBottom:false
							}
						}
					);
				},
				 convertImgToBase64(url, callback, outputFormat){
			       var canvas = document.createElement('CANVAS'),
			    　　ctx = canvas.getContext('2d'),
			    　　img = new Image;
			    　　img.crossOrigin = 'Anonymous';
			    　　img.onload = function(){
			        　　canvas.height = img.height;
			        　　canvas.width = img.width;
			        　　ctx.drawImage(img,0,0);
			        　　var dataURL = canvas.toDataURL(outputFormat || 'image/png');
			        　　callback.call(this, dataURL);
			        　　canvas = null; 
			        };
			    　　img.src = url;
			    }    
			}
		}
</script>

<style>
	.consult{
		height: 100%;
		background-color: #efeff4;
		padding-top: 44px;
	}
</style>
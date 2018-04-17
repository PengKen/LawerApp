<template>
	<div class="personal">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon"></a>
			<h1 class="mui-title">我的</h1>
		</header>
		<div class="mui-content">
				<ul class="mui-table-view mui-table-view-chevron">
							<li class="mui-table-view-cell mui-media" id="head-li">
								<a class="">
									<img class="mui-media-object mui-pull-left head-img" id="head-img" :src="userInfo.portrait">
									<div class="mui-media-body">
										{{userInfo.userName}}
										<p class='mui-ellipsis'>学号:{{userInfo.userID }}</p>
									</div>
								</a>
							</li>
						</ul>
				<ul class="mui-table-view" style="margin-top: 25px;">
					<li class="mui-table-view-cell">
					<a class="" @tap="goshowCollection">
					<i class="iconfont icon-star1"></i>
						<span>我的收藏</span>
						<i class="iconfont icon-more1"></i>	
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="">
					<i class="iconfont icon-fabuxinxi"></i>
						<span>我的发布</span>
						<i class="iconfont icon-more1"></i>	
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="" @tap="gochangePwd">
					<i class="iconfont icon-xiugaimima"></i>	
						<span>修改密码</span>
						<i class="iconfont icon-more1"></i>	
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class=""  @tap="gocontactUs">
					<i class="iconfont icon-lianxiwomen1"></i>	
						<span>联系我们</span>
						<i class="iconfont icon-more1"></i>
					</a>
				</li>
				
			</ul>
			<ul class="mui-table-view" style="margin-top: 25px;">
				<li class="mui-table-view-cell">
					<a class="" @tap='goaboutUs'>
						<span>关于法园君</span>
						<i class="iconfont icon-more1"></i>	
					</a>
				</li>
			</ul>
			<ul class="mui-table-view" style="margin-top: 25px;">
				<li class="mui-table-view-cell">
					<a style="text-align: center;color: #FF3B30;" @tap="backToLogin">
						退出登录
					</a>
				</li>
			</ul>
		</div>
		
			
	</div>
</template>

<script>

//		

	import Vue from 'vue'

	export default{
		data () {
			return {
				defaultImg: require("../../../static/img/nobody.png")
			}
		},
		computed:{
			userInfo () {
				console.log("computed " + this.$store.state.userInfo.portrait);
				return this.$store.state.userInfo;
			}
		},
		mounted () {
			
			let _this = this;
//			this.$post('/MyCollection.do', {
//					userid: 'admin'
//				}).then((response) => {
//					this.$store.commit("newCollections",response);
//				}).catch((err) => {
//					console.log("getMyCollection " + err);
//				})
			document.getElementById("head-li").addEventListener("tap", function(e) {
				if(mui.os.plus){
					var a = [{
						title: "拍照"
					}, {
						title: "从手机相册选择"
					}];
					plus.nativeUI.actionSheet({
						title: "修改头像",
						cancel: "取消",
						buttons: a
					}, function(b) {
						switch (b.index) {
							case 0:
								break;
							case 1:
								_this.getImage();
								break;
							case 2:
								_this.galleryImg();
								break;
							default:
								break
						}
					})	
				}
				
			});	
		},
			beforeRouteEnter(to, from, next) {
			console.log("enter router")
			next((vm)=>{
			document.addEventListener('getUserInfo',function(event){	
					vm.$store.commit('newUserInfo',event.detail.userInfo);
					vm.$post('/MyCollection.do', {
					userid: vm.userInfo.userID
				}).then((response) => {
					vm.$store.commit("newCollections",response);
				}).catch((err) => {
					console.log("getMyCollection " + err);
				})
			})
				
			});
		},
		methods:{
		
			backToLogin () {
				var btnArray = ['是', '否'];
                mui.confirm('您确定退出?', '', btnArray, function(e) {
                	 if ((mui.os.ios || mui.os.ipad || mui.os.iphone && e.index == 0) ||( mui.os.android && e.index==0)) 
                    {		
                        		{	
                           
                           	 if(true){
                                // 获取所有Webview窗口
                                var curr = plus.webview.currentWebview();
                                var wvs = plus.webview.all();
                                for (var i = 0, len = wvs.length; i < len; i++) {
                                    //关闭除setting页面外的其他页面
                                    if (wvs[i].getURL() == curr.getURL())
                                        continue;
                                    plus.webview.close(wvs[i]);
                                }
                                //打开login页面后再关闭setting页面
                                plus.webview.open('login.html');
                                 mui.plusReady(function(){
									plus.navigator.setStatusBarBackground('');
									plus.navigator.setStatusBarStyle("dark");
								})
                                curr.close();
                               
                                
                            } 
//                          else{
//                          		 plus.runtime.quit();
//                          		 console.log(2222);
//                          }
                               
                        }
                    }
                })		
			},
			gochangePwd () {
				this.$router.push("/changepwd");
			},
			gocontactUs () {
				this.$router.push("/contactUs");
			},
			goshowCollection () {
				this.$router.push({
					name:"showCollection",
					params:{
//						id:this.userInfo.userID
						id:2
					}
					
				});
			},
			goaboutUs(){
				this.$router.push("/aboutUs");
			},
			getImage () {
				/*手机拍照*/
				let _this = this;
				var c = plus.camera.getCamera();
				c.captureImage(function(e) {
					plus.io.resolveLocalFileSystemURL(e, function(entry) {
						var s = entry.toLocalURL();
					document.getElementById('head-img').src = s;
						
						_this.getBase64(s,(dataURL) =>{
							_this.$post('/ChangePortrait.do',{
								userid: _this.userInfo.userID,
								portrait: dataURL
							}).then((response)=>{
								console.log("portrait link " + response.portrait);
								if(('localStorage' in window) && window.localStorage !== null){
									localStorage.portrait = response.portrait;
								}else{
								_this.setCookie('portrait',response.portrait,10);
								}
//								document.getElementById('head-img').src = e;
							})
							
						})
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(s) {
					console.log("error" + s);
				}, {
					filename: "_doc/head" + new Date().getTime() + ".jpg"
					//这里的_doc不要省
				})
			},
			galleryImg() {
				/*从相册中获取*/
				let _this = this;
				plus.gallery.pick(function(a) {
					//if sucess
					document.getElementById("head-img").src = a;
					_this.getBase64(a,(dataURL) => {
						if(dataURL === document.getElementById("head-img").src)
							return ;
						_this.$post('/ChangePortrait.do',{
								userid: _this.userInfo.userID,
								portrait: dataURL
							}).then((response)=>{
								console.log("portrait link " + response.portrait);
								if(('localStorage' in window) && window.localStorage !== null){
									localStorage.portrait = response.portrait ;
								}else{
									_this.setCookie('portrait',response.portrait,10);
								}
								document.getElementById("head-img").src = e;
							})
						
					})
				}, function(a) {
					//if fail
				}, {
					filter: "image"
				})
			},
			getDefaultImg(){
				let _this = this;
					mui.plusReady(function(){
					console.log("getDefaultImg in");
   					if(('localStorage' in window) && window.localStorage !== null){
   							if(localStorage.portrait){
   								document.getElementById("head-img").src = localStorage.portrait;
   							}
					}else if(_this.getCookie('portrait') !== null && _this.getCookie('portrait')!=='' ){
								document.getElementById("head-img").src = localStorage.portrait;
					}else{
						document.getElementById("head-img").src = this.defaultImg;
					}
   			
   				});
			},
			getBase64(url,callback){
		 		
		        //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
				var Img = new Image();
				var dataURL = '';
				Img.src = url;
				
				Img.onload = function() { //要先确保图片完整获取到，这是个异步事件
				var canvas = document.createElement("canvas"); //创建canvas元素
				var	width = Img.width; //确保canvas的尺寸和图片一样
				var	height = Img.height;
				canvas.width = width;
				canvas.height = height;
				canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
				dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
				callback?callback(dataURL):null;
			};
		},
			setCookie(c_name, value, expiredays) {
				var exdate = new Date()
				exdate.setDate(exdate.getDate() + expiredays)
				document.cookie = c_name + "=" + escape(value) +
					((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
				console.log("inner console cookie " + this.getCookie("portrait"));
			},
			getCookie(c_name) {
				if(document.cookie.length > 0) {
					let c_start = document.cookie.indexOf(c_name + "=")
					if(c_start != -1) {
						c_start = c_start + c_name.length + 1
						let c_end = document.cookie.indexOf(";", c_start)
						/*indexOf的第二个参数表示是从数组的该位置开始进行查找*/
						if(c_end == -1) c_end = document.cookie.length
						/*c_end位-1表示cookie数组里只有一个元素，并且该元素就是我们要查找的内容*/
						return unescape(document.cookie.substring(c_start, c_end))
					}
				}
				return ""
			}
		
	}
  }
</script>
	
<style>
	
	html,body{
		width: 100%;
		height: 100%;
	}
	#feedback{
		width: 100%;
	}
	#personal{
		width: 100%;
	}
	#username{
		position: absolute;
		display: block;
		margin: auto;
		top: 20%;
		bottom: 0;
		left:25%;
		font-size: 20px;
		
	}
	#userid{
		position: absolute;
		display: block;
		margin: auto;
		/*top: 30%;*/
		bottom: 10%;
		left:25%
		
	}
	#head{
		width: 100px;
		height: 100px;		
	}
	.icon-more1{
		position: absolute;
		right: 10px;
	}
	.personal,.change-pwd,#feedback{
		width: 100%;
	}
	/*.personal{
		flex: 1;
		background-color: #F0EDF4;
		
	}
	.user-wrapper{
		position: relative;
		background-color: white;
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding: 0.2rem 0;
		
	}
	
	.portrial{
		display: inline-block;
		width: 3rem;
		height: 3rem;
	}
	.portrial>img{
		border-radius: 50%;
	}
	.user{
		text-align: center;
	}
	
	.userName{
		display: block;
		margin: 0.1rem 0;
		font-size: 0.3rem;
	}

	.options{
		
	}
	.option-item{
		background-color: white;
		display: flex;
		padding-bottom: 0.2rem;
	}
	.option-item>i{
		font-size: 0.7rem;
		color: grey;
		padding-left: 0.3rem;
		line-height: 1rem;
		box-sizing: border-box;
	}	
	.item-content{
		padding-bottom: 0.1rem;
		margin-left: 0.3rem;
		font-size: 0.4rem;
		display: inline-block;
		width: 100%;
		border-bottom: 0.01rem solid rgba(105,105,105,0.4);
		line-height: 1rem;
		box-sizing: border-box;
	}
	.logout-button{
		background-color: white;
		padding: 0 1rem;
		box-sizing: border-box;
		margin: 1rem 0 2rem;
		font-size: 0.5rem;
		color: orangered;
		/*filter:alpha(Opacity=80);
		/*ie*/
		/*-moz-opacity:0.6;*/
		/*firefox*/
	/*	opacity: 0.8 ;*/

/*	}*/
	/*.option-item:nth-child(2){
		margin-bottom: 0.3rem;
	}
	.option-item:nth-child(4){
		margin-bottom: 0.3rem;
	}*/
</style>
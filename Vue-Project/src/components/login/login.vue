<template>
	<div class="login" style="" ref="login">
		<header class="mui-bar mui-bar-nav reset-bgc clear"></header>
		<div class="mui-content">
			<form ref='loginForm' class="mui-input-group reset-bgc ">
				<div class="portriat-wrapper">
					<div class="portrait">
						<img ref="portrait" width="100%" height="100%" />
					</div>
				</div>
				<div class="mui-input-row">
					<label>学号</label>
					<input id='account' @focus="scrollIntoView" type="number" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="userID">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' @focus="scrollIntoView" type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="userPassword">
				</div>
			</form>

			<div class="mui-content-padded">
				<button id='login-but' class="mui-btn mui-btn-block mui-btn-primary" @tap="login">登录</button>
				<div class="link-area">
					<a id='reg' @tap="register">注册账号</a> <span class="spliter">|</span>
					<a id='forgetPassword' @tap="findPwd">忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">

			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default {
		data() {
			return {
				userInfo: {
					userID: "",
					userPassword: "",
					portrait: "",
					userName: "",
					email: "",
					token: "",
					message: "",
					major: ''
				},
				userID: '',
				userPassword: '',
				portrait: require('../../../static/img/nobody.png')
			}
		},
		computed: {

		},
		mounted() {
			var screenHeight = document.body.clientHeight;
			let _this = this;
			document.addEventListener('plusready', function() { //扩展的js对象在plusready后方可使用  
				_this.$indexPage.index = plus.webview.create("index.html", "index.html", {}, {}); //后台创建一个webview，载入show.html文件
			});
			window.addEventListener("resize", () => {
				document.getElementsByClassName("login")[0].style.height = screenHeight + 'px';
			})
			this.checkPortrait();
		},
		watch: {
			userPassword(newVal, oldVal) {
				if(newVal === '') {
					document.getElementById("login-but").style.opacity = 0.6;
				} else
					document.getElementById("login-but").style.opacity = 1;
			}

		},
		methods: {
			login() {
				if(this.userPassword === "" || this.userID === "") {
					Toast({
						message: '学号或密码不能为空',
						duration: 1000
					});
					return;
				}
				let _this = this;
				this.$post('/Login.do', {
						"userID": this.userID,
						"userPassword": this.userPassword
					})
					.then((response) => {
						console.log(response);
						if(response.message === "1") {
							this.userInfo = response;
							if(('localStorage' in window) && window.localStorage !== null) {
								localStorage.portrait = response.portrait
							} else {
								this.setCookie('portrait', response.portrait);
							}
							mui.fire(this.$indexPage.index, 'get_userInfo', {
								userInfo: this.userInfo
							});
							this.openWindow();
						} else {
							mui.toast('学号或密码不正确！', {
								duration: 'long',
								type: 'div'
							});
						}
					}).catch((err) => {
						console.log(err);
					})

			},
			register() {
				this.$router.replace("/register");
			},
			findPwd() {
				this.$router.replace("/findpwd");
			},
			getBase64(url, callback) {
				let _this = this;
				//通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
				var Img = new Image();
				var dataURL = '';
				Img.src = url;
				//console.log("img src " + Img.src)
				Img.onload = function() { //要先确保图片完整获取到，这是个异步事件
					var canvas = document.createElement("canvas"); //创建canvas元素
					var width = Img.width; //确保canvas的尺寸和图片一样
					var height = Img.height;
					canvas.width = width;
					canvas.height = height;
					canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
					dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
					console.log("dataURL " + dataURL);
					callback ? callback(dataURL) : null;
				};

			},
			checkPortrait() {
				let _this = this;
				var portrait;
				if(window.localStorage !== null && ('localStorage' in window)) {
					if(localStorage.portrait) {
						_this.$refs.portrait.src = localStorage.portrait;
						console.log(localStorage.portrait + " 1")

					} else {
						_this.$refs.portrait.src = _this.portrait;
						console.log(2);
					}
				} else if(_this.getCookie('portrait') !== null && _this.getCookie('portrait') !== '') {
					_this.$refs.portrait.src = _this.getCookie('portrait');
					console.log(3);
				} else {
					_this.$refs.portrait.src = _this.portrait;
					console.log(4);
				}

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
			},
			setCookie(c_name, value, expiredays) {
				var exdate = new Date()
				exdate.setDate(exdate.getDate() + expiredays)
				document.cookie = c_name + "=" + escape(value) +
					((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
				console.log("inner console cookie " + this.getCookie("portrait"));
			},
			openWindow() {

				this.$indexPage.index.show("slide-in-right", 300);
			},
			scrollIntoView(){
				let _this = this;
				setTimeout(function() {
//							this.$refs.loginForm.scrollIntoViewIfNeeded(!0)
						
							_this.$refs.loginForm.scrollIntoView(!0)
						}, 500)
			}
		}

	}
</script>

<style>
	.area {
		margin: 20px auto 0px auto;
	}
	
	.mui-input-group label {
		width: 22%;
	}
	
	.mui-input-row label~input,
	.mui-input-row label~select,
	.mui-input-row label~textarea {
		width: 78%;
	}
	/*.mui-checkbox input[type=checkbox],
		.mui-radio input[type=radio] {
			top: 6px;
		}*/
	
	.mui-content-padded {
		margin-top: 25px;
		position: relative;
	}
	
	.mui-btn {
		padding: 10px;
	}
	
	.link-area {
		display: block;
		margin-top: 25px;
		text-align: center;
	}
	
	.spliter {
		color: #bbb;
		padding: 0px 8px;
	}
	
	.oauth-area {
		position: absolute;
		bottom: 20px;
		left: 0px;
		text-align: center;
		width: 100%;
		padding: 0px;
		margin: 0px;
	}
	
	.oauth-area .oauth-btn {
		display: inline-block;
		width: 50px;
		height: 50px;
		background-size: 30px 30px;
		background-position: center center;
		background-repeat: no-repeat;
		margin: 0px 20px;
		/*-webkit-filter: grayscale(100%); */
		border: solid 1px #ddd;
		border-radius: 25px;
	}
	
	.oauth-area .oauth-btn:active {
		border: solid 1px #aaa;
	}
	
	.oauth-area .oauth-btn.disabled {
		background-color: #ddd;
	}
	
	.login {
		height: 100%;
		position: relative;
		background: url(../../../static/img/background.jpeg);
		background-size: 100% 100%;
		min-height: 100%;
	}
	
	.login .mui-content {
		background-color: transparent !important;
	}
	
	.portriat-wrapper {
		margin-top: 1rem;
	}
	
	.portrait {
		margin: 0 auto;
		height: 3rem;
		width: 3rem;
		border-radius: 50%;
	}
	
	.reset-bgc .mui-input-row:nth-child(2) {
		margin-top: 1.5rem;
	}
	
	.portrait>img {
		border-radius: 50%;
	}
	
	.reset-bgc {
		background-color: transparent !important;
		/*	padding-top: 3.5rem;*/
		box-sizing: border-box;
	}
	
	.clear {
		visibility: hidden;
	}
	
	#login-but {
		opacity: 0.6;
	}
</style>
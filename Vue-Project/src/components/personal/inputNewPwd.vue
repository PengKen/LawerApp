<template>
	<div class="change-pwd">
		<header class="mui-bar mui-bar-nav">
			<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @tap="back">
				<span class="mui-icon mui-icon-left-nav"></span>
		</button>
			<h1 class="mui-title">修改密码</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>新密码</label>
					<input ref='prePwd' type="password" class="mui-input-clear mui-input" v-model="newPwd" placeholder="请输入新密码">
				</div>
				<div class="mui-input-row">
					<label>确认</label>
					<input ref='prePwd' type="password" class="mui-input-clear mui-input" v-model="comfirmNewPwd" placeholder="请确认新密码">
				</div>
			</form>
			<div class="mui-content-padded">
				<button @tap="sendNewPwd" ref='pwdButton' class="mui-btn mui-btn-block mui-btn-primary pwd-button">确认</button>
			</div>

		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				userID: '',
				newPwd: '',
				comfirmNewPwd: ''
			}
		},
		methods: {
			sendNewPwd() {
				let _this = this;
				if(this.newPwd.length < 6) {
					mui.alert("新密码长度不得至少7位", "消息", "我知道了");
					return;
				}
				if(this.newPwd !== this.comfirmNewPwd) {
					mui.alert("两次输入的密码不一致", "消息", "我知道了");
					return;
				}

				this.$post('/ChangePassword.do', {
					userid: this.userID,
					newPwd: this.newPwd
				}).then((response) => {
					console.log(response.result);
					if(response.result === "yes") {
						Toast({
							message: "修改成功即将返回登录界面",
							duration: 3000
						})

						setTimeout(function() {
							mui.openWindow({
								url: 'login.html',
								createNew: true, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
								show: {
									autoShow: true //页面loaded事件发生后自动显示，默认为true
									//							aniShow: animationType, //页面显示动画，默认为”slide-in-right“；
									//							duration: animationTime //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
								},
								waiting: {
									autoShow: true, //自动显示等待框，默认为true
									title: '正在加载...' //等待对话框上显示的提示内容
								}
							})
						}, 3000)
					}

				}).catch((err) => {
					console.log("change pwd err " + err);
				})
			},
			back() {
				this.$router.replace("/changepwd");
			}
		},
		watch: {
			comfirmNewPwd(newVal) {
				if(newVal !== '' && this.newPwd !== '') {
					this.$refs.pwdButton.style.opacity = 1;
				} else {
					this.$refs.pwdButton.style.opacity = 0.5;
				}
			}
		},
		mounted() {
			this.userID = this.$route.params.userID;
			this.newPwd = this.$route.params.newPwd;
		}

	}
</script>

<style>
	.area {
		margin: 20px auto 0px auto;
	}
	
	.mui-input-group:first-child {
		margin-top: 20px;
	}
	
	.mui-input-group label {
		width: 26%;
	}
	
	.mui-input-row label~input,
	.mui-input-row label~select,
	.mui-input-row label~textarea {
		width: 72%;
	}
	
	.mui-checkbox input[type=checkbox],
	.mui-radio input[type=radio] {
		top: 6px;
	}
	
	.mui-content-padded {
		margin-top: 25px;
	}
	
	.mui-btn {
		padding: 10px;
	}
	
	#code {
		width: 35% !important;
		float: left !important;
		padding-left: 4px !important;
	}
	
	.code-button {
		margin-top: 3px;
		border-radius: 16px;
		width: 30% !important;
	}
	
	.mui-content-padded>p {
		text-align: center;
	}
	
	#backIcon {
		line-height: 44px;
	}
</style>
<template>
	<div class="register">
		<header class="mui-bar mui-bar-nav">
			<!--	<a  id="reg_return" class="mui-icon mui-icon-left-nav mui-pull-left" @tap="backToLogin"></a>-->
			<span id="backIcon" @tap="backToLogin"><i class="iconfont icon-iconfont6" style="color: white;"></i></span>
			<h1 class="mui-title">注册</h1>
		</header>
		<div class="mui-content" id="regGroup">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>学号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" @change="checkUserId" v-model="userInfo.userid" placeholder="学号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" @change="checkPwdLen" placeholder="6位以上密码" v-model="userInfo.password">
				</div>
				<div class="mui-input-row">
					<label>确认</label>
					<input id='password_confirm' type="password" class="mui-input-clear mui-input" @change="checkPwd" placeholder="请确认密码" v-model="checkPassword">
				</div>
				<div class="mui-input-row">
					<label>昵称</label>
					<input id='username' type="text" class="mui-input-clear mui-input" placeholder="昵称" v-model="userInfo.name">
				</div>
				<div class="mui-input-row">
					<label>专业</label>

					<input id='major' type="text" @focus="showPicker" class="mui-input-clear mui-input"  placeholder="专业" v-model="major">
				</div>
				<div class="mui-input-row">
					<label>邮箱</label>
					<input id='email' type="text" class="mui-input-clear mui-input" v-model="userInfo.email" placeholder="邮箱">

				</div>
				<div class="mui-input-row">
					<label>验证码</label>
					<input id='code' type="text" class="mui-input-clear mui-input" v-model="userInfo.code" placeholder="验证码">
					<button id="getCode" class="code-button" @click="getCode" type="button">{{ timmer }} </button>

				</div>
			</form>
			<div class="mui-content-padded">
				<button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @tap="checkAuthCode">注册</button>
			</div>
			<div class="mui-content-padded">
				<p>注册即同意相关条律</p>
			</div>

		</div>
		<mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" style="width: 100%;">
			<mt-picker :slots="slots" @change="onValuesChange" :showToolbar='true'>
				<div id="">
					<p style="text-align: center;line-height: 40px; color: black;font-size: 18px;">学院 - 专业</p>
					<div id="" @tap="deliverMajor" style="position: absolute; top: 5px;right: 5px;color: #0e7fe2;">
						确定
					</div>
				</div>

			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	let checkUserId = require('./modules/checkUserId.js');
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				userInfo: {
					userid: "",
					password: "",
					name: "",
					email: "",
					code: "",
					portrait: "",
					major:''
				},
				major:'',
				getCodeUrl: "",
				timmer: "获取验证码",
				time: "",
				timeLimit: 60,
				checkCode: "",
				checkPassword: "",
				regState: "",
				popupVisible: false,
				showToolbar: true,
				initMajor:false,
				majorArr: {
					'数信学院': ['计科', '软工', '网工', '信科', '信息', '工业工程'],
					'法学学院': ['哲学', '法学', '中文学', '汉语', '法学', '历史学'],
					'食品学院': ['食品科学与工程', '食品质量与安全', '生物工程', '包装工程'],
					'经管学院': ['经济学', '管理学', '金融', '人力资源', '市场营销', '国际经济与贸易'],
					'兽医学院': ['动物科学', '水产养殖', '蚕学'],
					'工程学院': ['测绘', '自动化', '车辆', '土木', '材料', '建筑'],
					'动科学院': ['动物科学', '水产养殖', '蚕学'],
					'艺术学院': ['服装设计与工程', '服装与服饰设计', '视觉传达设计', '环境设计', '产品设计', '动画', '音乐学', '广播电视编导', '表演']
				},
				slots: [{
					flex: 1,
					values: ['数信学院', '法学学院', '工程学院', '经管学院', '食品学院', '兽医学院', '动科学院', '艺术学院'],
					className: 'slot1',
					textAlign: 'right'
				}, {
					divider: true,
					content: '-',
					className: 'slot2'
				}, {
					flex: 1,
					values: ['计科', '软工', '网工', '信科', '信息', '工业工程'],
					className: 'slot3',
					textAlign: 'left'
				}]
			}
		},

		methods: {
			deliverMajor(){
				this.popupVisible = false;
			},
			onValuesChange(picker, values) {
				if(!this.initMajor)
					this.major ='';
				else{
					this.major = values[1];
					this.userInfo.major = values[0].split('学院')[0];
					console.log(this.userInfo.major);
				}
					
				picker.setSlotValues(1, this.majorArr[values[0]])
				this.initMajor = true;
			},
			checkNull(lable) {
				var check = true;
				mui("#regGroup input").each(function() {
					//若当前input为空，则alert提醒 
					if(!this.value || this.value.trim() == "") {
						var label = this.previousElementSibling;
						if(lable === "getCode" && label.innerText === "验证码")
							return;
						mui.alert(label.innerText + "不允许为空");
						check = false;
						return false;
					}
				}); //校验通过，继续执行业务逻辑 
				if(check) {
					return true;
				}
			},
			showPicker(){
				document.getElementById('major').blur();
				this.popupVisible = true;
			},
			checkUserId() {

				let idState = "yes";
				let reg = /^201[4-7]/;

				if((!reg.test(this.userInfo.userid)) || this.userInfo.userid.length != 12) {
					idState = "no";
					Toast({
						message: ' 学号不存在 ',
						position: 'center',
						duration: 3000
					});
					setTimeout(()=>{
						this.userInfo.userid = '';
					},2000)
					return;
				}
				this.$post("/CheckUserId.do", {
					userid: this.userInfo.userid
				}).then((response) => {
					if(response.result === "yes") {
						this.regState = "yes";
					} else {
						setTimeout(()=>{
						this.userInfo.userid = '';
					},2000)
						Toast({
							message: ' 学号已被注册！',
							position: 'center',
							duration: 3000
						});

					}
					console.log(response);
				}).catch((err) => {
					console.log(err);
				})

			},
			getCode() {
				if(!this.checkNull("getCode")) {
					return;
				}
				let reg = /\w+@\w+.com/;
				if(!reg.test(this.userInfo.email)) {
					Toast({
						message: "请检查邮箱格式",
						position: 'center',
						duration: 3000
					})
					return;
				}
				mui.alert("验证码已发送至邮箱，请查收！");
				this.$post("/CheckEmail.do", {
					email: this.userInfo.email
				}).then((response) => {
					this.checkCode = response.authCode;
				}).catch((err) => {
					console.log(err);
				})
				let _this = this;

				clearInterval(_this.time);
				_this.time = setInterval(function() {
					document.getElementById("getCode").style.backgroundColor = "lightgrey";
					document.getElementById("getCode").style.color = "grey";
					if(_this.timmer == "0s") {
						clearInterval(_this.time);
						_this.timmer = "获取验证码";
						document.getElementById("getCode").style.backgroundColor = "white";
						document.getElementById("getCode").style.color = "black";
						_this.timeLimit = 60;
						return;
					}
					_this.timmer = _this.timeLimit-- + "s";

				}, 1000)

			},
			checkAuthCode() {
				if(!this.checkNull()) {
					return;
				}
				let _this = this;
				if(this.userInfo.code === this.checkCode) {
					if(this.regState === "yes") {
						Toast({
							message: "注册成功！",
							position: 'center',
							duration: 3000
						})
						_this.timmer == "0s";
						_this.$post('/Register.do', _this.userInfo).then((response) => {
							console.log(response.result);
						})
						setTimeout(function() {
							_this.$router.push("/login")
						}, 3000)

					} else {
						Toast({
							message: ' 学号已被注册！',
							position: 'center',
							duration: 3000
						});

					}

				} else {
					Toast({
						message: ' 验证码错误！',
						position: 'center',
						duration: 3000
					});

				}
			},
			checkPwd() {

				if(this.userInfo.password !== this.checkPassword) {
					Toast({
						message: ' 两次输入的密码不一致！',
						position: 'center',
						duration: 3000
					});
					this.checkPassword = "";
				}
			},
			backToLogin() {
				this.$router.push("/login")
			},
			checkPwdLen() {
				if(this.userInfo.password.length <= 6) {
					Toast({
						message: ' 请检查密码长度！',
						position: 'center',
						duration: 3000
					});

					this.userInfo.password = "";
				}
				if(this.userInfo.password.length > 15) {
					Toast({
						message: ' 别闹～～～ ',
						position: 'center',
						duration: 3000
					});
					this.userInfo.password = "";
				}
			}
		},
		mounted() {

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
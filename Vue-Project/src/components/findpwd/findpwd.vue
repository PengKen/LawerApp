<template>
	<div class="findpwd">
	<header class="mui-bar mui-bar-nav">
		<!--	<a  id="reg_return" class="mui-icon mui-icon-left-nav mui-pull-left" @tap="backToLogin"></a>-->
		<span id="backIcon" @tap="back"><i class="iconfont icon-iconfont6"></i></span>
		<h1 class="mui-title">找回密码</h1>
	</header>
	<div class="mui-content">
		<form class="mui-input-group" id="findPwdGroup">
			<div class="mui-input-row">
				<label>账号</label>
				<input id='account' type="text" class="mui-input-clear mui-input" required="required" v-model="userInfo.userid" placeholder="学号">
			</div>
		
			<div class="mui-input-row">
				<label>邮箱</label>
				<input id='email' type="email" class="mui-input-clear mui-input" v-model="userInfo.email" required="required" placeholder="请输入注册时填写的邮箱地址">
			</div>
		</form>
		<div class="mui-content-padded">
			<button id='reg' @tap="backToLogin" class="mui-btn mui-btn-block mui-btn-primary">提交申请</button>
		</div>
		
	</div>
</div>
</template>

<script>
		import { Toast } from 'mint-ui';
		export default{
			data () {
				return {
					userInfo:{
						userid: "",
						email: ""
					}
				}
			},
			methods: {
					backToLogin() {
						let _this = this;
						mui("#findPwdGroup input").each(function() {
							//若当前input为空，则alert提醒 
							if(!this.value || this.value.trim() == "") {
								var label = this.previousElementSibling;
								mui.alert(label.innerText + "不允许为空");
								check = false;
								return false;
							}
						}); //校验通过，继续执行业务逻辑 
						this.$post('/ForgotPassword.do',this.userInfo).then((response)=>{
							if(response.result === "yes"){
								Toast({
									message:"密码已重置，请检查邮箱",
									duration:3000
								})
								setTimeout(function(){
									_this.$router.push("/login")
								},3000)
							}
							else{
								mui.alert("学号或邮箱输入有误！")
							}
						}).catch((err)=>{
							console.log(err);
						})
					},
					back(){
						this.$router.replace("/login");
					}
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
			#code{
				width: 35% !important;
				float: left !important;
				padding-left: 4px !important;
			}
			.code-button{
				margin-top: 3px ;
				border-radius: 16px;
				width: 30% !important;
			}
			.mui-content-padded>p{
				text-align: center;
			}
			#backIcon{
				line-height: 44px;
			}
</style>
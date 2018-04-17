<template>
	<div class="change-pwd">
		<header class="mui-bar mui-bar-nav">
		<!--	<a  id="reg_return" class="mui-icon mui-icon-left-nav mui-pull-left" @tap="backToLogin"></a>-->
		<button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left" @tap="back">
				<span class="mui-icon mui-icon-left-nav"></span>
		</button>
		<h1 class="mui-title">修改密码</h1>
	</header>
	<div class="mui-content">
		<form class="mui-input-group">
		
			<div class="mui-input-row">
				<label>旧密码</label>
				<input ref='prePwd' type="text" v-model="inputUserPassword" class="mui-input-clear mui-input"  placeholder="请输入旧密码">
			
			</div>
		</form>
		<div class="mui-content-padded">
			<button @tap="checkPrePwd" ref='pwdButton' class="mui-btn mui-btn-block mui-btn-primary pwd-button" >下一步</button>
		</div>
		
	</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				inputUserPassword:''
			}
		},
		computed:{
			userPassword () {
				return this.$store.state.userInfo.userPassword;
			},
			userID () {
				return this.$store.state.userInfo.userID;
			}
		},
		watch:{
			inputUserPassword(newVal,oldVal){
				
				if(newVal !== ''){
					this.$refs.pwdButton.style.opacity =1;
				}else{
					this.$refs.pwdButton.style.opacity = 0.5;
				}
			}
		},
		methods:{
			checkPrePwd () {if(this.$refs.prePwd.value=== ''){
					mui.alert("旧密码不能为空","消息","我知道了");
				}else if(this.$refs.prePwd.value !== this.userPassword){
					mui.alert("密码错误","消息","我知道了");
				}else {
					this.$router.push({
						name:'inputNewPwd',
						params:{
							userID:this.userID
						}
					})
				}
			},
			back () {
				this.$router.replace('/');
			}
		},
		mounted () {
			//是route.params不是router.params
		}
	}
</script>

<style>
			.pwd-button{
				background: lightskyblue;
				border: none;
				opacity: 0.5;
				transition: opacity 500ms;
			}
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
			#backIcon{
				line-height: 44px;
			}
			
</style>
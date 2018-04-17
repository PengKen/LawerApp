<template>
	<div class="home">
		<a href="#modal" @tap="proposeQues" class="myButton">我要<br/>咨询</a>
		<div id="modal" class="mui-modal">
				<header class="mui-bar mui-bar-nav">
					<a class="mui-icon mui-icon-close mui-pull-right" href="#modal" @tap="backToMain" ></a>
					<h1 class="mui-title" style="font-family:Arial;;">请选择分类</h1>
				</header>
				<div class="mui-content" style="height: 100%;">
					<ul class="choice" >
						<li class="sub-choice">
							<span @tap="chooseKind">
								<i class="iconfont icon-guanyuwomen"></i>
								<p>创业</p>
							</span>
							<span @tap="chooseKind">
								<i class="iconfont icon-renzhengquanyi"></i>
								<p>消费者权益</p>
							</span>
						</li>
						<li class="sub-choice">
							<span @tap="chooseKind"><i class="iconfont icon-hetong"></i><p>合同</p></span>
							<span @tap="chooseKind"><i class="iconfont icon-zhishichanquanguanli"></i><p>知识产权</p></span>
						</li>
						<li class="sub-choice">
							<span @tap="chooseKind"><i class="iconfont icon-lianjie"></i><p>劳动纠纷</p></span>
							<span @tap="chooseKind"><i class="iconfont icon-qita"></i><p>其他</p></span>
						</li>
					</ul>
				</div>
			</div>
	</div>
</template>

<script>
	export default{
		data () {
			return {
				homeBackground: require('./image/home.png'),
				button: require('./image/Slice.png'),
				toggleBottom: false//false表示不清除底部选项卡
			}
		},
		mounted () {
			let _this = this;
			document.addEventListener('getUserInfo',function(event){	
					_this.$store.commit('newUserInfo',event.detail.userInfo);
//					_this.getDefaultImg();
			})
			mui.plusReady(function(){
					
						plus.webview.currentWebview().setStyle({
							bottom:"51px"
						})
			})
			var h = window.screen.width/(639/849);
			console.log(h);
			document.getElementsByClassName("myButton")[0].style.top = h * 0.7 + 'px';
		},
		methods:{
			proposeQues(event){
				this.toggleBottom = true;
			},
			chooseKind(event){
				this.$router.push({
					name:'consult',
					params:{
						kind:event.currentTarget.innerText.trim()
					}
				});
			},
			backToMain(){
				this.toggleBottom = false;
			}
			
		},
		watch:{
			toggleBottom(newVal,oldVal){
				console.log("in");
				if(newVal){
					mui.plusReady(function(){
						plus.webview.currentWebview().setStyle({
							bottom:"0px"
						})
					})
				}
				else{
					
					mui.plusReady(function(){
						plus.webview.currentWebview().setStyle({
							bottom:"51px"
						})
					})
				}
			}
		}
	}
</script>

<style>
	html,body,.home{
		height: 100%;
	}
	.home{
			position: relative;
			background: url(image/home.png) no-repeat;
			background-size: contain;
	}
	.myButton {
		/*font-family:'LiDeBiao-Xing31111faad181bf0b' !important;*/
		-moz-border-radius:50%;
		-webkit-border-radius:50%;
		border-radius:50%;
		display:inline-block;
		cursor:pointer;
		color:#3ca2ed;
		
		font-size:1rem;
		width: 4rem;
		height: 4rem;
		text-decoration:none;
		text-shadow:0px 1px 0px #2f6627;
		position: absolute;
		/*top: 62%;*/
		left: 0;
		right: 0;
		margin: 0 auto;
		line-height: 1.6rem;
		text-align: center;
	}
	.choice{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.sub-choice{
		display: flex;
		padding: 2.5rem 0;
		flex: 1 1 30%;
		flex-direction: row;
		justify-content: space-around;
	}
	.sub-choice span{
		text-align: center;
		
		
	}
	/*.myButton:active {
		position:absolute;
		top:53.3%;
		color: black;
	}*/
	.choice i{
		font-size:2rem;
	}
	.sub-choice p{
		margin-top: 0.3rem;
	}
	.sub-choice>span:active{
		position: relative;
		top: 2px;
	}
</style>
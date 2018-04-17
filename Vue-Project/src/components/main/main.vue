<template>
	<div class="app-main">
		<router-view></router-view>
		<div class="routes">
			
			<!--<div class="item">
				
				<router-link to="/main/home">
					<i class="iconfont icon-home-g"></i>
					<span>首页</span>
				</router-link>
			</div>
		
			<div class="item">
				
				<router-link to="/main/onlook">
					<i class="iconfont icon-yanjing"></i>		
					围观
				</router-link>
			</div>
				
			<div class="item">
			
				<router-link to="/main/found">
					<i class="iconfont icon-faxian1"></i>
					发现
				</router-link>
			</div>
			
			<div class="item">
					
				<router-link to="/main/personal">
					<i class="iconfont icon-wode-active"></i>
					<span>我的</span>
				</router-link>
			</div>
	
		</div>-->
	
		<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active"  @tap="toHome">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item">
				<span class="mui-icon mui-icon-email" @tap="toOnlook"></span>
				<!--	<span class="mui-badge">9</span>-->
				<span class="mui-tab-label">围观</span>
			</a>
			<a class="mui-tab-item" @tap="toFound">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">发现</span>
			</a>
			<a class="mui-tab-item" @tap="toPersonal">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">我的</span>
			</a>
		</nav>
	</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			toOnlook () {
				
			},
			toFound () {
				this.$router.push("/main/listview");
			},
			toPersonal () {
				this.$router.replace("/main/personal");
			},
			toHome () {
				this.$router.replace("/main/home");
			}
		}
	}
</script>

<style>
	.app-main{
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.routes{
		border-top: 0.01rem solid rgba(230,230,230,1);
		background-color: white;
		font-size: 0.2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: fixed;
		padding-bottom: 0.05rem;
		bottom: 0;
		height: 1.5rem;
		width: 100%;
		box-sizing: border-box;
	}
	a{
		text-decoration: none;
		
	}
	.item{
		
		flex: 1;
		box-sizing: border-box;
		padding: 0.2rem 0 0 0;
		text-align: center;
		
		
	}
	.item>a{
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.item>a>i,.item>i{
		display: inline-block;
		font-size:0.7rem !important;
	}	
	.router-link-active{
		color: dodgerblue;
	}
</style>
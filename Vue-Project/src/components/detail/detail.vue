<template>
	<div class="detail">
			<header class="mui-bar mui-bar-nav">
			   <!-- <a class="mui-action-back mui-icon iconfont icon-iconfont6"></a>-->
			   <button id="backIcon" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
					<span class="mui-icon mui-icon-left-nav"></span>
			   </button>
			    <h1 class="mui-title">详情</h1>
			</header>
			
			<!--<header id="detail-header" class="mui-bar mui-bar-nav">
				<h1 class="mui-title">详情</h1>
			    <span  class="mui-action-back"><i class="iconfont icon-iconfont6"></i></span>
			</header>-->
			  <!--<a class="mui-action-back">
			  	<span><i class="iconfont icon-iconfont6"></i></span>
			  	
			  </a>-->
			<div id="detail-content" class="mui-content">
			<!--顶部banner图 开始-->
			<div id="kr-article-banner" class="kr-article-banner">
				<div id="kr-article-cover" class="kr-article-cover">
					<img :src="cover" width="100%" height="100%">
				</div>
				<h2 id="kr-article-title" class="kr-article-title"><span v-show="month "> {{ month }}  | </span>{{ title }}</h2>
			</div>
			<!--顶部banner图 结束-->
			
			<div class="kr-article-content">
				<!-- 文章作者、发布时间等信息 -->
				<div class="kr-article-meta">
				<!--	<div id="kr-article-author" class="kr-article-author"></div>-->
					<div class="kr-article-text">发表于 {{time}}</div>
					<div id="kr-article-time" class="kr-article-time">
						<a href="http://www.maxlaw.cn/top">{{ source }}</a>
					</div>
				</div>
				<!--文章详细内容-->
				<div id="kr-article-article" class="kr-article-article" v-html="content"></div>
			</div>
		</div>
	</div>
</template>


<script>
	export default{
		data () {
			return {
					cover: '',
					title: '',
					kind: '',
					time: '',
					content: '',
					month: '',
					source: ''
			}
		},
		methods: {
				resetData () {//重置数据
					Object.assign(this.$data, this.getDefaultData());
			},
			
			getDefaultData(){
				 return {
					cover: '',
					title: '',
					kind: '',
					time: '',
					content: '',
					month: '',
					source: ''
				}
			}			

		},
		mounted() {
		
				let _this = this;
				document.addEventListener('get_detail', function(event) {
							console.log("detai_in");
						var guid = event.detail.guid;
		//				if(!guid) {
		//					return;
		//				}
						_this.cover = event.detail.cover;
						_this.title = event.detail.title;
						_this.kind = event.detail.kind;
						_this.time = event.detail.time;
						_this.month = event.detail.month;
						_this.source = event.detail.source;
						console.log("content_url " + event.detail.content_url);
						mui.getJSON(event.detail.content_url, {}, function(rsp) {
							
							_this.content =  rsp.content;
							console.log("_this.content " + _this.content);
							console.log("rsp " + rsp.content);
						});
						
				});
					//重写返回逻辑
					mui.back = function() {
						plus.webview.currentWebview().hide("auto", 300);
					}
					
					//窗口隐藏时，重置页面数据
					mui.plusReady(function () {
						var self = plus.webview.currentWebview();
						self.setStyle({'popGesture':'none'});
						self.addEventListener("hide",function (e) {
							window.scrollTo(0, 0);
							console.log("i am hiede")
							_this.resetData();
						},false);
					})
				}
				
			}
</script>

<style>
	@import '../../../static/css/list-to-detail.css';
	#backIcon{
		color: white !important;
	}

	.detail>.mui-bar{
		background-color: lightskyblue !important;
	}
	#kr-article-time>span{
		font-size: 13px;
		vertical-align: middle;
   		 color: gray;
   	 	padding: 0 5px;
	}
</style>
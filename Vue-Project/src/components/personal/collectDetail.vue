<template>
	<div class="collect-detail">
		<a @tap="back"  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: white; position: absolute; top: 10px; left: 10px; z-index: 998;"></a>
		<header class="mui-bar mui-bar-nav" style="box-shadow: none; opacity: 0;" id="header">
			
			<h1 class="mui-title" style="text-align: left; height: 50px;">{{ collectDetail.description }}</h1>
		</header>

		<div class="mui-content" id="collect-content">
			<div class="mui-scroll-wrapper" id="scroll-wrapper" style="overflow-y: scroll;">
				<div class="mui-scroll">
					<div class="collect-detail-title">

						<p style="" class="kind"> 收录于 {{ collectDetail.description }}</p>
						<div class="detail-title">

							<span><i class="iconfont icon-pinglun1"></i> <span style="font-size: 0.4rem; vertical-align: middle;">{{collectDetail.answerNum}}</span></span>
							<span><i class="iconfont icon-yanjing" style="margin-left: 0.2rem;"></i> <span style="font-size: 0.4rem; vertical-align: middle;">{{collectDetail.reading}}</span></span>
						</div>
						<div class="author-detail">
							<img width="20" height="20" :src="collectDetail.portrait" />
							<span class="collect-detail-name">{{ collectDetail.username }}  创建于 {{ create_time }}</span>
							<!--<span class="collect-detail-name" style="vertical-align: text-top;"> </span>-->
						</div>
					</div>
					<div class="collect-content">
						<div>
							<p ref="muiCardContent" class="collect-detail-content" style=""></p>
						</div>
					</div>
					<div class="collect-comment" v-if="commentItems">
						<p v-if="commentItems.Top3.length===0" style="margin-top: 1rem; text-align: center;">暂无评论</p>
						<p v-if="commentItems.Top3.length >0" class="nice-comments">精彩评论</p>
						<ul id="hotComments" ref="hotComments">
							<li v-for="(item,index) in commentItems.Top3">
								<comment-item :commentItem='item' v-if="index < 3" :index="index" lable="false"></comment-item>
							</li>
						</ul>
						<p  v-if="commentItems.Top3.length>0" style="margin-top: 0.5rem; margin-bottom: 0.5rem; text-align: center;" @tap="openCommentDetail">查看更多评论 >></p>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>

</script>
<script>
	import { utilDate } from './js/utilDate.js'

	import commentItem from '../commentItem/commentItem'
	export default {
		beforeRouteEnter(to, from, next) {
			console.log("collectdetail in");

			next()
		},

		mounted() {
			mui.plusReady(() => {
				
				this.commentDetail = mui.preload({
					url: 'commentDetail.html',
					id: 'commentDetail',
					styles: {
						"render ": "always ",
						"popGesture ": "none",
						"bounce ": "vertical ",
						"bounceBackground ": "#efeff4 "
					}
				})
				this.pagePreLoadTime++;
				console.log(this.pagePreLoadTime);
				console.log(this.commentDetail)
			})
			let _this = this;
			this.$refs.muiCardContent.innerHTML = this.collectDetail.content;
			this.$post('/GetComment.do', {
				questionid: this.collectDetail.questionid
			}).then((res) => {
				console.log(res);
				this.commentItems = res;
			})
			let opactyFlag = false;
			var headerHeight = document.querySelector('.collect-detail>.mui-bar').scrollHeight;
			document.getElementById('scroll-wrapper').addEventListener("scroll", function() {
				
				$('.collect-detail-title').css({
//					opacity: (1-(this.scrollTop / (4*_this.rem))) < 0.8 ? 0.8 : (1-this.scrollTop / (4*_this.rem))
					opacity:(1-this.scrollTop / (4*_this.rem))
				})
				
				$('#header').css({
					opacity: this.scrollTop / (5*_this.rem)
				})
			})

		},
		data() {
			return {
				index: 0,
				create_time: '',
				commentItems: null,
				rem: parseFloat(document.documentElement.style.fontSize),
				commentDetail:null

			}
		},
		computed: {
			collectDetail() {

				this.create_time = utilDate.format(this.$store.state.collections[this.$route.params.index].create_time)
				return this.$store.state.collections[this.$route.params.index];
			},
			userInfo(){
				return this.$store.state.userInfo;
			}
		},

		methods: {
			back() {
				this.$router.replace('/showCollection');
			},
			openCommentDetail(){
				mui.fire(this.commentDetail, 'get_commentDetail', {
								onlookItem: this.collectDetail,
								userInfo: this.userInfo,
								commentDetail: this.commentDetail
							});
							setTimeout(() => {
								console.log(this.commentDetail)
								this.commentDetail.show("slide-in-bottom", 300);
								//						_this.webview_detail.show("")
							}, 150);
			}
		},
		components: {
			'commentItem': commentItem
		}

	}
</script>

<style>
	.kind {
		color: white;
		font-size: 0.6rem;
		position: absolute;
		top: 1.5rem;
		left: 20px;
	}
	
	.collect-detail-content{
		line-height: 0.8rem;
	   	font-weight: 420;
	   	font-size: 0.5rem;
	    -webkit-box-orient: vertical;
	    color: black;
	    font-weight: 400;
	}
	.collect-detail .collect-content {
		width: 100%;
		margin-top: 0.3rem;
		position: relative;
		padding: 20px;
		background: white;
		font-size: 0.55rem;
		color: black;
		font-weight: 330;
	}
	
	.collect-detail-portrait {
		width: 3rem;
		height: 3rem;
		margin: auto;
		position: absolute;
		top: -1.5rem;
		z-index: 998;
		left: 0;
		right: 0;
	}
	
	.author-detail img {
		border-radius: 50%;
		height: 0.8rem;
		width: 0.8rem;
		vertical-align: middle;
	}
	
	.collect-detail {
		width: 100%;
	}
	
	.collect-detail-name {
		text-align: center;
		margin-top: 0.6rem;
		font-size: 0.5rem;
		color: white;
		/*font-weight: bold;*/
		padding-left: 0.3rem;
	}
	
	.detail-title {
		position: absolute;
		top: 2.5rem;
		padding-left: 20px;
		color: white;
	}
	
	.collect-detail a {
		color: white;
	}
	
	.author-detail {
		position: absolute;
		bottom: 0.5rem;
		padding-left: 20px;
	}
	
	.icon-pinglun1,
	.icon-yanjing {
		color: white;
		font-weight: bold;
	}
	
	#scroll-wrapper {
		top:0px;
	}
	
	html,
	.collect-detail {
		height: 100%;
	}
	
	.nice-comments {
		height: 1.1rem;
		box-sizing: border-box;
		margin-bottom: 0 !important;
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
		font-size: 0.4rem;
		text-indent: 2em;
		top: 44px;
		/*	position: fixed;*/
		z-index: 9;
		background-color: #EAEAEA;
		width: 100%;
	}
	
	.collect-detail-title{
		position: relative;
		height: 	5rem;
		background: lightskyblue;
	}
	.mui-card-content {
		padding-left: 1.8rem;
		padding-top: 0.2rem;
		padding-right: 30px;
		border-bottom: 1px solid #f3ecec;
		box-sizing: content-box;
	}
	.collect-detail .mui-card{
		box-shadow: none !important;
		margin: 0 !important;
	}
	.collect-detail .icon-zan{
		padding-left: 5px;
	}
</style>
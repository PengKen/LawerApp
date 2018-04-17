<template>
	<div id="comment-detail">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: white;"></a>
			<h1 class="mui-title" style="text-align: left; font-weight: 400; color: white;">
			    		评论( {{ onlookItem.answerNum }} )
			    </h1>
		</header>

		<div v-if='newComments'>
			<p v-if="newComments.length === 0" class="tips">未有任何人评论</p>
			<p v-if="hotcomments.length >0" class="hotComments">热门评论</p>
			<div class="mui-scroll-wrapper" ref="scrollWrapper">
				<div class="mui-scroll">
					<div class="mui-content comment-content">

						<ul id="hotComments" ref="hotComments">
							<li v-for="(item,index) in hotcomments" :key='item.answerid'>
								<comment-item :commentItem='item'  :index="index" lable="hot"></comment-item>
							</li>
						</ul>
						<p v-if="newComments.length >0" class="newComments" ref="newComments">
							最新评论( {{ onlookItem.answerNum }} )
						</p>
						<ul id="newComments">
							<li v-for="(item,index) in newComments" :key='item.answerid'>
								<a href="javascript:void(0)">
									<comment-item :commentItem='item' :index="index" lable="hot"></comment-item>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="comment-area">
			<div class="">
				<textarea id='msg-text' type="text" :placeholder="writeComment" v-model="commentContent" class='input-text iconfont'></textarea>
				<label for="" class="footer-right" @tap="send">
				<!--<i id='msg-type' class="mui-icon mui-icon-mic"></i>-->
				<span class="send"><i class="iconfont icon-send"></i></span>
				</label>

			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import commentItem from '../commentItem/commentItem'
	import { getCommentDetail } from './getCommentDetail'
	export default {
		data() {
			return {

				commentContent: '',
				writeComment: "\ue614 说点什么吧",
				rem: document.documentElement.clientWidth / 6.4 / 2

			}
		},
		computed: {
			userInfo(){
				return this.$store.state.userInfo;
			},
			onlookItem() {
				return this.$store.state.curOnlookItem;
			},
			hotcomments(){
				return this.$store.state.commentItems.Top3;
			},
			newComments() {
				//				console.log(this.$store.state.commentItems.comment.length + " length")
				this.$nextTick(() => {
					console.log(this.$store.state.commentItems.comment);
					console.log(this.$refs.scrollWrapper)
					if(this.$refs.scrollWrapper) {
						this.scroll();
					}
				})
				return this.$store.state.commentItems.comment;
			}

		},
		methods: {
			scroll() {
				let _this = this;
				let flag = false;
				var hot = document.getElementById('hotComments').scrollHeight;
				
				this.$refs.scrollWrapper.addEventListener("scroll", function(e) {
					if(this.scrollTop > (hot + _this.rem)) {
						if(!flag) {

							window.requestAnimationFrame(() => {
								document.getElementsByClassName("hotComments")[0].innerText = "最新评论";
								flag = true;
							})

						}

					} else {
						if(flag) {
							window.requestAnimationFrame(() => {
								document.getElementsByClassName("hotComments")[0].innerText = "热门评论";
								flag = false;
							})

						}

					}

				})
			},
			send() {

				if(this.commentContent !== '') {
					this.$post('/InsertAnswer.do', {
						content: this.commentContent,
						questionid: this.onlookItem.questionid,
						userid: this.userInfo.userID,
						username: this.userInfo.userName,
						flag: "Q",
						images: []
					}).then((res) => {
						this.commentContent = '';
						Toast({
							message: '发表成功',
							iconClass: 'iconfont icon-icon_success',
							duration: '1000	'
						});
						this.commentContent = '';
						document.getElementById("msg-text").blur();
						this.$post('GetComment.do', {
							questionid: this.onlookItem.questionid
						}).then((res) => {
							Toast({
								message: '发表成功',
								iconClass: 'iconfont icon-icon_success',
								duration: '1000	'
							});

							this.$store.commit('newCommentItems', res);
						})

					})
					//					this.$post('/InsertAnswer.do',
					//					{
					//						content: this.commentContent,
					//						questionid: 164,
					//						userid: 2,
					//						username: '洲头物',
					//						flag: "Q",
					//						images:[]
					//					}).then((res)=>{
					//						this.commentContent = '';
					//						document.getElementById("msg-text").blur();
					//					this.$post('/GetComment.do',
					//					{
					//						questionid:164
					//					}).then((res)=>{
					//						Toast({
					// 						 message: '发表成功',
					//						 iconClass: 'iconfont icon-icon_success',
					//						 duration: '1000	'
					//						});
					//					
					//						this.$store.commit('newCommentItems',res);
					//					})
					//					})
				}
			},
			getCommentDetail(event){
				console.log("get_commentDetail");
				console.log(event.detail.commentDetail);
				this.$store.commit('newUserInfo', event.detail.userInfo);
				this.$store.commit("newCurOnlookItem", event.detail.onlookItem)
				
				this.$post('/GetComment.do', {
					questionid: this.onlookItem.questionid
			
				}).then((res)=> {
					this.$store.commit('newCommentItems', res);
					//						_this.commentItems = res;
				})
			},
			hide(){
					window.scrollTo(0, 0);
					console.log("i am hiede")
					this.$store.commit('newCommentItems',[]);
			}
		},
		watch: {
			commentContent(newVal) {

				if(newVal !== '') {
					document.querySelector(".send i").style.color = 'lightskyblue';
				} else {
					document.querySelector(".send i").style.color = '';
				}
			}
		},
		components: {
			'commentItem': commentItem
		},
		beforeRouteLeave(to,from,next){
			window.removeEventListener('get_commentDetail',this.getCommentDetail,false);
			next();
		},
		mounted() {

		 	window.addEventListener('get_commentDetail',this.getCommentDetail,false);
			
			mui.plusReady(()=>{
						var self = plus.webview.currentWebview();
						self.setStyle({'popGesture':'none'});
						self.removeEventListener("hide",this.hide,false);
						self.addEventListener("hide",this.hide,false);
					})
		}
	}
</script>

<style>
	#comment-detail .mui-scroll-wrapper {
		overflow-y: scroll;
		bottom: 1.8rem;
	}
	
	.tips {
		margin-top: 1rem;
		text-align: center;
	}
	
	.mui-card {
		margin: 0;
	}
	
	#comment-detail {
		margin-bottom: 0.6rem;
		height: 100%;
		width: 100%;
	}
	
	#comment-detail>.mui-content>.mui-card {
		margin-bottom: 0.5rem;
	}
	
	#comment-detail .mui-bar {
		/*background: #007aff;*/
		background: lightskyblue;
		box-shadow: none;
		opacity: 1;
	}
	
	.mui-card-content {
		padding-left: 1.8rem;
		padding-top: 0.2rem;
		padding-right: 30px;
		border-bottom: 1px solid #f3ecec;
		box-sizing: content-box;
	}
	
	.mui-card-footer {
		justify-content: space-around;
	}
	
	.icon-zan,
	.icon-chat,
	.icon-shoucang2,
	.icon-dianzan,
	.icon-star {
		padding-left: 0.1rem;
	}
	
	#comment-item-header {
		position: absolute;
		background: white;
		z-index: 666;
	}
	
	#backIcon {
		line-height: 44px;
	}
	
	#comment-detail .mui-content .mui-card {
		margin-top: 0px;
	}
	
	.comment-area {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: white;
		height: 1.5rem;
		z-index: 10000;
	}
	
	#msg-text {
		height: 1.5rem;
		margin-bottom: 0px !important;
		display: inline-block;
		font-size: 0.5rem;
		/*padding-left: 30px;*/
		padding-right: 50px;
		border-bottom: none;
		border-left: none;
	}
	
	.send {
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		line-height: 1.5rem;
		right: 0.8rem;
		display: inline-block
	}
	
	.send,
	.write i {
		color: rgb(161, 162, 164);
		/*font-size: 0.3rem;*/
	}
	
	.footer-right {
		position: absolute;
		width: 1.5rem;
		height: 1.5rem;
		right: 0px;
		top: 0px;
		text-align: center;
		vertical-align: middle;
		line-height: 100%;
		padding: 12px 5px;
		display: inline-block;
	}
	
	.hotComments {
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
		font-size: 0.4rem;
		text-indent: 2em;
		position: fixed;
		top: 44px;
		background-color: #EAEAEA;
		width: 100%;
		z-index: 9;
		margin-bottom: 0 !important;
		transition: top 0.3s;
		height: 1.1rem;
		box-sizing: border-box;
	}
	
	.newComments {
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
	
	#newComments {}
</style>
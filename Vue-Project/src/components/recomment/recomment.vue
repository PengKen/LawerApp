<template>
	<div class="recomment">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">回复</h1>
		</header>
		<div id="popover" class="mui-popover">
		  <ul class="mui-table-view">
		    <li class="mui-table-view-cell" @tap="addLike">点一个赞</li>
		    <li class="mui-table-view-cell" @tap="reComment" @click="reComment">回复评论</li>

		  </ul>
		</div>
		<div class="mui-scroll-wrapper">
			<div class="mui-scroll" v-if="commented">
				<p v-if="commented.length === 0" class="tips">未有任何人评论</p>
				<ul>
					<li v-for="(item,index) in commented" :key='item.create_time'>
						<a href="#popover" @tap="saveCommenter(index)">
							<div class="mui-card">
							<div class="mui-card-header mui-card-media">
								<img :src="item.portrait" style="border-radius: 50%;" />
									<span v-if='item.userid==="2016"'style="color: #03A9F4;position: absolute;top: 45px;left: 8px;"><i class="iconfont icon-iconfontzhizuobiaozhun023114"></i></span>
								<div class="mui-media-body" style="color: rgb(160,160,160); font-weight: 350;">
									{{ item.username }}
																				
									<p style="font-weight: 300; font-size: 11px"> {{ item.formatTime }}</p>
								</div>
								<div class="add-like">
									<a class="mui-card-link"   style="font-size: 14px; color:rgb(161,162,164);">
										<span>{{ item.likes===0?'':item.likes }}</span>
										<i class="iconfont icon-zan" ref="like" style="transition: transform 0.8s;"></i>
									</a>
								</div>

							</div>
							<div class="mui-card-content">
								
								<p class="card-content" ref="content"></p>
							</div>
						</div>
						</a>
						
					</li>
				</ul>
			</div>
		</div>
		<div class="comment-area">
			<div class="">
				<textarea id='msg-text' type="text" :placeholder="writeComment + beCommenteder" v-model="commentContent" class='input-text iconfont'></textarea>
				<label for="" class="footer-right" @tap="send">
				<!--<i id='msg-type' class="mui-icon mui-icon-mic"></i>-->
				<span class="send"><i class="iconfont icon-send"></i></span>
				</label>

			</div>
		</div>
	</div>
</template>

<script>
	import { Progress } from 'mint-ui';
	import { Toast } from 'mint-ui'
	import Vue from 'vue'
	import { getTime } from '../onlook/js/getTime'
	Vue.component(Progress.name, Progress);
	import commentItem from '../commentItem/commentItem'
	import { utilDate } from '../personal/js/utilDate.js'
	//	mui("#demo1").progressbar().show();
	export default {
		components: {
			'commentItem': commentItem
		},
		data() {
			return {
				k: 30,
				writeComment: "\ue614 "+ "@ ",
				commented: [],
				host: '',
				commentContent: '',
				beCommenteder: '',
				changeBeCommenteder: false,
				createTime:'',
				commentItem:[],
				toggleLike:[false],
				index:0
			}
		},
		methods: {
			saveCommenter(index){
				this.index = index
			},
			reComment(){			
				mui('#popover').popover('hide');
				this.beCommenteder = this.commented[this.index].username;
				document.getElementById('msg-text').focus();
			},
			addLike(){
				mui('#popover').popover('hide');
				if(!this.toggleLike[this.index]){
					console.log(this.index)
					this.$nextTick(()=>{
						console.log(this.$refs)
						this.$refs.like[this.index].style.color = "skyblue";
						this.commented[this.index]['likes']++;
						this.toggleLike[this.index] = true;
						this.$post('/LikeComment.do',{
						commentid:this.commented[this.index].commentid

					}).then((res)=>{
						console.log(res);
					})
					})
					
				}
			},
			send() {
				if(this.commentContent !=''){
					let _this = this;
					
					this.commented.unshift({
							username:this.$store.state.userInfo.userName,
							userid:this.$store.state.userInfo.userID,
							formatTime:utilDate.format(getTime()),
							create_time:getTime(),
							portrait:this.$store.state.userInfo.portrait
						})
					if(this.beCommenteder != this.host){
						this.$nextTick(()=>{
							console.log("name " + this.commentContent);
							this.$refs.content[this.$refs.content.length-1].innerHTML = "<span style='color:#af2f25;'>"+"@" + this.beCommenteder+"</span>" + " "
																						+ this.commentContent.split(' ')[1];
							
						})
						this.commentContent = "@"+this.beCommenteder+" " + this.commentContent;
					}else{
						this.$nextTick(()=>{
							this.$refs.content[this.$refs.content.length-1].innerHTML = this.commentContent
						})
					}
					this.$post("/InsertComment.do",{
						content:this.commentContent,
						answerid:this.commentItem.answerid,
						userid:this.$store.state.userInfo.userID,
//						answerid:254,
//						userid:2,
//						username:"iamnewname111",
//						portrait:'http://p31o5rsje.bkt.clouddn.com/portraitOf2_1520306378521.jpg'
						username:this.$store.state.userInfo.userName,
						portrait:this.$store.state.userInfo.portrait
					}).then((res)=>{
						this.commentContent = '';
						this.beCommenteder = this.host;
						Toast({
 						 message: '评论成功',
						 iconClass: 'iconfont icon-icon_success',
						 duration: '1000	'
					});
						

					})
				}
			},
			doComment() {

			}
		},
		computed: {
			
		},
		mounted() {
			
			this.commentItem = this.$route.params.commentItem;
			this.commented = this.$route.params.commentItem.comment;
			this.commented.forEach((val,index,arr)=>{
				
//				arr[index].fomatTime = utilDate.format(arr[index].create_time); 不能检测并渲染
				val['formatTime'] = utilDate.format(arr[index].create_time);//可以检测并被渲染
			})
			this.$nextTick(()=>{
				this.$refs.content.forEach((val,index)=>{
					if(this.commented[index].content.indexOf("@")!=-1){
						var beCommenter = this.commented[index].content.split(' ')[0];
						val.innerHTML = "<span style='color:#af2f25;'>"+beCommenter+"</span>" + " " + this.commented[index].content.split(' ')[1];
					}else{
						val.innerHTML = this.commented[index].content;
					}
					
				})
			})
			
			this.host = this.$route.params.commentItem.username;
			this.beCommenteder = this.host;
		},
		watch: {
			commentContent(newVal) {

				if(newVal !== '') {
					document.querySelector(".send i").style.color = 'lightskyblue';
				} else {
					document.querySelector(".send i").style.color = '';
				}
			}
		}
	}
</script>

<style>
	.recomment {
		/*padding: 10px 15px;*/
		height: 100%;
		width: 100%;
	}
	.recomment .mui-scroll-wrapper{
		overflow-y:scroll;
		overflow-x: hidden;
		bottom:1.5rem;
		
	}
	.tips {
		margin-top: 1rem;
		text-align: center;
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
	
	.comment-area {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: white;
		height: 1.5rem;
		z-index: 10000;
	}
</style>
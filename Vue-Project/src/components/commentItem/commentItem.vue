<template>
	<div class="comment-item" ref="commentItem">
		<div id="comment-item-content">
			<div id='msg-list'>
				<div class="mui-card">
					<div class="mui-card-header mui-card-media">
						<img :src="commentItem.portrait"  style="border-radius: 50%;"/>
						<span v-if='commentItem.userid==="2016"'style="color: #03A9F4;position: absolute;top: 45px;left: 8px;"><i class="iconfont icon-iconfontzhizuobiaozhun023114"></i></span>
						<div class="mui-media-body" style="color: rgb(160,160,160); font-weight: 350;">
							{{ commentItem.username }}
						
							<p style="font-weight: 300; font-size: 11px"> {{ createTime }}</p>
						</div>
						<div class="add-like">
							<a class="mui-card-link" style="font-size: 14px; color:rgb(161,162,164);" @tap="addLike" >
								<span>{{ likes===0?'':likes }}</span>
								<i class="iconfont icon-zan" ref="like" style="transition: transform 0.8s;"></i>
							</a>
						</div>
						
					</div>
					<div class="mui-card-content" >
						<p class="card-content"  style="font-size: 14px;word-break: break-word;"ref="content"></p>
						<p class='getMore' v-show='showMore' ref='getMore'  @tap='getMore'>展开更多</p>
					<!--	<re-comment :commented="commentItem.comment"></re-comment>-->
					</div>
					<div class="add-comment" v-show="isCommentShow">
							<a  style="font-size: 14px; color:rgb(161,162,164); " @tap="showCommented">
								<span>{{ commented===0?'':commented }}</span>
								<i class="iconfont icon-pinglun"></i>
							</a>
							
					</div>
				</div>
				
			</div>
			
		</div>
		<!--<div id="modal" class="">
					hahahahh
		</div>-->
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import { initContent,getMore } from '../onlook/js/initContent';
	import { utilDate } from '../personal/js/utilDate'
	import recomment from '../recomment/recomment'
	export default{
		data(){
			return {
				likes:0,
				commented:0,
				toggleLike:false,
				descreaseLimit: 0,
				createTime:'',
				showMore:false,
				toggleMore:'0',
				rem: document.documentElement.clientWidth / 6.4 / 2,
				scrollFlag:false
			}
		},
		components:{
			'reComment': recomment
		},
		computed:{
			
			isCommentShow(){
				return this.lable==="false"?false:true
			}
		},
		methods:{
			initContent,
			getMore,
			addLike(){
				var temp;
				if(!this.toggleLike){
					temp = this.likes;
					this.$refs.like.style.color = "skyblue";
					this.likes++;
					this.toggleLike = true;
					this.$post('/LikeAnswer.do',{
						answerid:this.commentItem.answerid
					}).then((res)=>{
						console.log(res);
					})
				}
				
			},
			
			showCommented (event) {
				console.log("show");
				console.log( this.commentItem.comment);
				this.$router.push({
					name:'recomment',
					params:{
						commentItem:this.commentItem
					}
				})
					
			}
			},
			mounted() {
				this.$refs.content.innerHTML =  this.commentItem.content;
				this.likes = this.commentItem.likes;
				this.commented = this.commentItem.comment.length;
				this.createTime = utilDate.format(this.commentItem.create_time)
				this.initContent()
			},
			props:{
				commentItem:{
					type:Object
				},
				index:{
					type: Number
				},
				lable:{
					type:String
				}
			}
		}
</script>

<style>
	
		.comment-content {
				height: 100%;
				/*padding: 44px 0px 50px 0px;*/
				/*padding-bottom: 1.4rem;*/
				overflow: auto;
				background-color: #eaeaea;
				position: relative;
				top: 1.2rem;
			}
			#msg-list {
				height: 100%;
				overflow: auto;
				-webkit-overflow-scrolling: touch;
			}
			#comment-item-content{
				padding-top:0 !important;
			}
			li{
				padding:0;
				top:0;
				z-index: 99999;
			}
			#msg-list .mui-card{
				
			}
			.card-content{
				color:#333;
				font-weight: 400;
				margin-top: 0px !important;
				
			}
			.add-like{
				position: absolute;
				right: 10px;
				top: 10px;
			}
			.add-comment{
				position: absolute;
				right: 10px;
				bottom: 10px;
			}
			.comment-item{
				background: rgb(244,242,245);
				
			}
			.mui-card{
				background-color: rgb(244,242,245) ;
			}
			.add-like>a:active>i{
				transform: scale(1.5,1.5);
				
			}
		.card-content{
		/*text-indent: 2em;*/
		line-height: 0.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		/*-webkit-line-clamp: 4;*/
		-webkit-box-orient: vertical;
		color: black;
		font-weight: 400;
		
	}
</style>
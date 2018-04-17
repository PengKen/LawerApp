<template>
	<div class="item" >
		<div class="mui-card" ref="item">
				<input type="hidden" name="" id="" v-model="isCollected" />
				<div class="mui-card-header mui-card-media">
					<img :src="onlookItem.portrait"  style="border-radius: 50%;"/>
					<span v-if='onlookItem.userid==="2016"'style="color: #03A9F4;position: absolute;top: 45px;left: 8px;"><i class="iconfont icon-iconfontzhizuobiaozhun023114"></i></span>
					<div class="mui-media-body">
						{{ onlookItem.username }}
						<p>{{ onlookItem.major }}，{{ onlookItem.userid.slice(2,4)}}级
						</p>
					</div>
				</div>
				<div class="mui-card-content" >
					<div class="card-content">
						<p class="content" ref="content"></p>
						<p class='getMore' v-show='showMore' ref='getMore'  @tap='getMore'>展开更多</p>
					</div>
					<div class="content-img">
						<ul ref="ul">
							<li v-for="(img,index) in imgSrc">
								<img :src="img" v-lazy="img" width="100%" height="100%" :data-preview-group="index" data-preview-src=""/>
							</li>
						</ul>
						
					</div>
				</div>
				<div class="mui-card-footer">
					<a style="display: block;" class="mui-card-link comment" ref='showComment' @tap="showComment" >
						<i class="iconfont icon-chat"></i> 
						{{ onlookItem.answerNum==0?'':onlookItem.answerNum }}
					
					</a>
					<a style="display: block;" class="mui-card-link"  @tap="addCollect">
						<i class="iconfont icon-shoucang2"  ref="collect"></i>
					</a>
				</div>
				
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { Lazyload } from 'mint-ui';
	import Vue from 'vue';
	import { getMore,initContent} from '../onlook/js/initContent'
	Vue.use(Lazyload);
	export default{
		data () {
			return {
				itemId:'',
				answerDescription: '',
				kind:'',
				likeNum: '',
				commentNum: '',
				toggleMore: '0',
				toggleLike: '0',
				toggleCollect: '0',
				showMore:false,
				rem : parseFloat(document.documentElement.style.fontSize),
				commentDetail:null,
				titleNView :{ //详情页原生导航配置
											backgroundColor: '#f7f7f7', //导航栏背景色
											titleText: '', //导航栏标题
											titleColor: '#000000', //文字颜色
											type: 'transparent', //透明渐变样式
											autoBackButton: true, //自动绘制返回箭头
											splitLine: { //底部分割线
													color: '#cccccc'
									 }
						}
			}
		},
		computed:{
			userInfo () {
				return this.$store.state.userInfo;
			},
			isCollected(){
				let collectIDs = this.$store.state.collectIDs;
				//console.log(collectIDs)
				if(collectIDs.indexOf(this.onlookItem.questionid) != -1){
					this.$nextTick(()=>{
						this.$refs.collect.className = "iconfont icon-star";
						this.toggleCollect = '1';
					})
					
					
				}
				return this.$store.state.collectIDs;
			},
			imgSrc () {
				let imgs = this.onlookItem.images.split("|");
				this.$nextTick( () => {
					this.$refs.content.innerHTML = this.onlookItem.content;
					this.initContent();
					if(imgs.length > 1){
						
						var list = this.$refs.ul.querySelectorAll('li');
						for(let k = 0; k < list.length; k++){
							list[k].style.height = 4 * this.rem + 'px';
							list[k].style.overflow = 'hidden';
							list[k].children[0].style.height = 'auto';
							list[k].children[0].style.margin = '-0.3rem 0';
						}
					}
				})
				
				return (imgs[0]==='')?[]:imgs;
			}
		},
		props:{
			onlookItem:{
				type:Object
			},
			index:{
				type: Number
			},
		},
		mounted () {
			let _this = this;
			console.log(this.onlookItem.userid.slice(2,4))
//					this.$refs.content.innerHTML = this.onlookItem.content;
			
//			mui.plusReady(()=>{
//				
//				this.commentDetail = mui.preload({
//				url: 'commentDetail.html',
//				id: 'commentDetail',
//				styles: {
//					"render ": "always ",
//					"popGesture ": "none",
//					"bounce ": "vertical ",
//					"bounceBackground ": "#efeff4 ",
//					"titleNView ":_this.titleNView
//				}
//			})
//			})
			
			mui.previewImage();
		},
		watch:{
		},
		methods:{
			initContent,
			getMore,
			addCollect () {
				if(this.toggleCollect === '0'){
					this.$refs.collect.className = "iconfont icon-star";
					this.toggleCollect = '1';
					this.$post('/InsertCollection.do',{
						userid: this.userInfo.userID,
						questionid: this.onlookItem.questionid+""
					})
					Toast({
 						 message: '收藏成功',
						 iconClass: 'iconfont icon-icon_success',
						 duration: '1000	'
					});
					
				}
				else{
					
					console.log(this.onlookItem.questionid)
					
					this.$post('/DeleteCollection.do',{
						userid: this.userInfo.userID,
						questionid: this.onlookItem.questionid
					})
					this.$refs.collect.className = "iconfont icon-shoucang2";
					this.toggleCollect = '0';
				}
			},
			showComment (event) {
				var event = event || window.event;
				console.log("aaa " + this.commentDetail);
				this.$store.commit('newCurOnlookItem',this.onlookItem);
			}
				
				
			}
		}
</script>

<style>
	.mui-card-content{
		padding: 10px 10px 10px 54px;
		box-sizing: border-box;
	}
	.card-content >p{
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
	.getMore{
		color: rgb(147,153,159) !important;
	}
	.icon-zan,.icon-chat,.icon-shoucang2,.icon-dianzan,.icon-star{
		padding-right: 0.2rem;
	}
	.header-border{
		border-bottom: 0.3rem solid rgba(0,134,255,0.8);
	}
	.mui-media-body>h2{
		font-size:0.5rem;
	}
	.mui-card{
		margin: 6px !important;
	}
	.answer-description{
		margin-left: -44px;
		padding-top: 0.2rem;
	}
	.mui-media-body p:first-child{
		font-weight: 500;
		color: black;
	}
	.content-img ul{
		display: flex;
	}
	.content-img ul li{
		flex:0 1 auto;
		width: 4rem;
		/*height: 3rem;*/
		padding: 0;
		margin-right: 0.2rem;
		box-sizing: border-box;
		/*display: inline-block;*/
	}
	.mui-preview-image.mui-fullscreen {
				position: fixed;
				z-index: 20;
				background-color: #000;
			}
	.mui-preview-header,
	.mui-preview-footer {
		position: absolute;
		width: 100%;
		left: 0;
		z-index: 10;
	}
	.mui-preview-header {
		height: 44px;
		top: 0;
	}
	.mui-preview-footer {
		height: 50px;
		bottom: 0px;
	}
	.mui-preview-header .mui-preview-indicator {
		display: block;
		line-height: 25px;
		color: #fff;
		text-align: center;
		margin: 15px auto 4px;
		width: 70px;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 12px;
		font-size: 16px;
	}
	.mui-preview-image {
		display: none;
		-webkit-animation-duration: 0.5s;
		animation-duration: 0.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	.mui-preview-image.mui-preview-in {
		-webkit-animation-name: fadeIn;
		animation-name: fadeIn;
	}
	.mui-preview-image.mui-preview-out {
		background: none;
		-webkit-animation-name: fadeOut;
		animation-name: fadeOut;
	}
	.mui-preview-image.mui-preview-out .mui-preview-header,
	.mui-preview-image.mui-preview-out .mui-preview-footer {
		display: none;
	}
	.mui-zoom-scroller {
		position: absolute;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		-webkit-backface-visibility: hidden;
	}
	.mui-zoom {
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
	.mui-slider .mui-slider-group .mui-slider-item img {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
	}
	.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
		width: 100%;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
		display: inline-table;
	}
	.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
		display: table-cell;
		vertical-align: middle;
	}
	.mui-preview-loading {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: none;
	}
	.mui-preview-loading.mui-active {
		display: block;
	}
	.mui-preview-loading .mui-spinner-white {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -25px;
		margin-top: -25px;
		height: 50px;
		width: 50px;
	}
	.mui-preview-image img.mui-transitioning {
		-webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
		transition: transform 0.5s ease, opacity 0.5s ease;
	}
	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@-webkit-keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	img[lazy=loading] {
	  width: 4rem;
	  height: 4rem;
	  background-image: url(../onlook/image/wating.png);
	  background-size: 100%;
	}
	.mui-card-footer{
		padding: 0.1rem 2rem;
	}
</style>
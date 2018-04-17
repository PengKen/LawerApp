<template>

	<div class="onlook" style="position: relative;">
		<!--<button @click="upRefresh"style="z-index=1000000; position: fixed; top: 44px;">上拉</button>-->
		<div v-if="curOnlookItem"></div>
		<div class="pop" id="pop">
			<div class="popup-wrapper">
				<div class="content">
					<span>{{ (newDataLength==0)?('未发现有新数据'):('发现了' + newDataLength + '条新数据') }}</span>
				</div>
			</div>
	    </div>
		<div  id="refreshContainer" class="mui-scroll-wrapper">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li v-for="(onlookItem,index) in onlookItems">
						<onlook-item :onlookItem="onlookItem" :index="index" ref="onlookItem"></onlook-item>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import onlookItem from '../onlookItem/onlookItem'
	import { getTime } from './js/getTime'
	export default {
		data() {
			return {
				itemLength: 0,
				popupVisible: false,
				newDataLength: 0,
				commentDetail: null,
				pagePreLoadTime:1
			}
		},

		watch: {
			onlookItems() {
				this.$nextTick(() => {
					var onlookItems = this.$refs.onlookItem;
					onlookItems.forEach(((val,index)=>{
						val.$refs.showComment.removeEventListener('tap', this.openCommentDetail, false);
					}))
					onlookItems.forEach((val, index) => {
						val.$refs.showComment.addEventListener('tap', this.openCommentDetail, false)
					})
					//					console.log(this.$refs.onlookItem[0].$refs)
				})

			}
		},
		computed: {
			onlookItems() {

				return this.$store.state.onlookItems;
			},
			userInfo() {
				return this.$store.state.userInfo;
			},
			curOnlookItem() {
				return this.$store.state.curOnlookItem;
			}

		},
		components: {
			'onlookItem': onlookItem
		},
		created() {

		},
		mounted() {
			
			let _this = this;
			this.downRefresh();
//			document.getElementById('refreshContainer').addEventListener("click",haha(event),false)
			document.addEventListener('getUserInfo', function(event) {
				console.log("onlook getuserinfo")
				_this.$store.commit('newUserInfo', event.detail.userInfo);

				_this.$post("/MyCollection.do", {
					userid: _this.userInfo.userID

				}).then((res) => {
					let arr = [];
					res.forEach((val, index) => {
						arr.push(val.questionid);
					})
					_this.$store.commit('newCollectIDs', arr);
					//					this.collectionIDs = res;
				})
			})

			//			this.$post("/MyCollection.do",{
			//					userid:2
			//					
			//				}).then((res)=>{
			//					let arr = [];
			//					res.forEach((val,index)=>{
			//						arr.push(val.questionid);
			//					})
			//					console.log("arr " + arr)
			//					this.$store.commit('newCollectIDs',arr);
			////					this.collectionIDs = res;
			//				})

			mui.init({
				pullRefresh: {
					container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
					down: {
						style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
						color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
						height: '50px', //可选,默认50px.下拉刷新控件的高度,
						range: '100px', //可选 默认100px,控件可下拉拖拽的范围
						offset: '44px', //可选 默认0px,下拉刷新控件的起始位置
						auto: false, //可选,默认false.首次加载自动上拉刷新一次
						callback: this.downRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
					},
					up: {
						height: 50,
						contentrefresh: '正在加载...',
						contentnomore: '没有更多数据...', //可选，请求完毕若没有更多数据时显示的提醒内容；
						callback: this.upRefresh
					}
				}
			});
			//console.log(this.$store.state.onlookItems);
		},
		methods: {
			downRefresh() {
				document.documentElement.style.fontSize = window.innerWidth / 6.4 / 2 + "px";
				this.$post('/HotTopics.do', {
					date: (this.onlookItems != 0) ? this.onlookItems[this.onlookItems.length - 1].create_time : ''
				}).then((response) => {
					(response.length - this.onlookItems.length > 0) ?
					(this.newDataLength = response.length - this.onlookItems.length) : (this.newDataLength = 0)
					this.$store.commit("newOnlookItems", response);
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
					document.getElementById('pop').style.height = "44px";
					document.getElementById('pop').style.opacity = "1";
					setTimeout(function() {
						document.getElementById('pop').style.height = "0px";
						document.getElementById('pop').style.opacity = "0";
						//document.getElementById('pop').classList.remove('o');
					}, 3000)

				}).catch((err) => {
					console.log("HotTopics.do error " + err);
					mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
				})
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
			},
			upRefresh() {
				this.$post('/MoreHotTopics.do', {
					date: this.onlookItems[this.onlookItems.length - 1].create_time
				}).then((response) => {
					if(response.length > 0) {
						this.$store.commit("newOnlookItems", this.onlookItems.concat(response));
					}
					setTimeout(() => {
						mui('#refreshContainer').pullRefresh().endPullupToRefresh((response.length === 0));
					}, 600)

				}).catch((err) => {
					console.log("HotTopics.do error " + err);
					mui('#refreshContainer').pullRefresh().endPullupToRefresh();
				})
			},
			openCommentDetail(){
				
				mui.fire(this.commentDetail, 'get_commentDetail', {
								onlookItem: this.$store.state.curOnlookItem,
								userInfo: this.userInfo,
								commentDetail: this.commentDetail
							});
							setTimeout(() => {
								console.log(this.commentDetail)
								this.commentDetail.show("slide-in-bottom", 300);
								//						_this.webview_detail.show("")
							}, 150);
			}
		}
	}
</script>

<style>
	/*.onlook{
		display: flex;
	}*/
	
	.onlook-title {
		position: fixed;
		width: 100%;
		flex: 0 0 2rem;
		padding: 0.2rem 0;
	}
	
	.onlook-title>h1 {
		text-align: center;
		font-size: 0.6rem;
		font-weight: 200;
		color: grey;
	}
	
	.onlook-content {
		width: 100%;
	}
	
	.pop {
		/*z-index: -2;*/
		z-index: 998;
		position: absolute;
		top: 0px;
		background: rgba(101, 101, 101, 0.9);
		width: 100%;
		height: 0px;
		opacity: 0;
		text-align: center;
		padding: 10px 3rem;
		transition: height 2s, opacity 2s;
	}
	
	.content span {
		color: white;
		font-weight: 300;
		font-size: 13px;
	}
</style>
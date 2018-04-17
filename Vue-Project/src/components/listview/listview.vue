<template>
	<div class="list-view">
		<header class="mui-bar mui-bar-nav" >
			<h1 id="title" class="mui-title">发现</h1>
	</header>
		<div class="mui-content">
			<div id="slider" class="  mui-slider banner">
				<div class="mui-slider-group mui-slider-loop">
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="javascript:;">
							<img :src="banner[2].cover">
							<p class="mui-slider-title">静静看这世界</p>
							<h2 class="title mui-ellipsis-2"> {{ banner[2].kind }} | {{ banner[2].title }} </h2>
						</a>
					</div>
					<div class="mui-slider-item ">
						<a href="javascript:;"  @tap="open_detail(banner[0])">
							<img :src="banner[0].cover">
							<h2 class="title mui-ellipsis-2">{{ banner[0].kind }} | {{ banner[0].title }}</h2>
						</a>
					</div>
					<div class="mui-slider-item ">
						<a href="javascript:;" @tap="open_detail(banner[1])">
							<img :src="banner[1].cover">
							<h2 class="title mui-ellipsis-2">{{ banner[1].kind }} | {{ banner[1].title }}</h2>
						</a>
					</div>
					<div class=" mui-slider-item ">
						<a href="javascript:;" @tap="open_detail(banner[2])">
							<img :src="banner[2].cover">
							<h2 class="title mui-ellipsis-2">{{ banner[2].kind }} | {{ banner[2].title }}</h2>
						</a>
					</div>
					<div class=" mui-slider-item  mui-slider-item-duplicate">
						<a href="javascript:;">
							<img :src="banner[0].cover" @tap="open_detail(banner[0])">
							<h2 class="title mui-ellipsis-2 ">{{ banner[0].kind }} | {{ banner[0].title }}</h2>
						</a>
					</div>
					
				</div>
				<div class="mui-slider-indicator mui-text-right ">
					<div class="mui-indicator mui-active "></div>
					<div class="mui-indicator "></div>
					<div class="mui-indicator "></div>
				</div>
		</div>
			<div id="list" class="mui-scroll-wrapper ">
				<div class="mui-scroll ">
					<ul class="mui-table-view ">
						<li class="mui-table-view-cell mui-media" v-for="item in items">
							<a href="javascript:; " :data-guid="item.guid " @tap="open_detail(item) ">
								<img class="mui-media-object mui-pull-left " :src="item.cover">
								<div class="mui-media-body ">
									<div class="mui-ellipsis-2">{{item.title}}</div>
								</div>
								<div class="meta-info ">
									<div class="author "> <span v-show="item.month "> {{item.month }}  | </span>{{item.kind}}</div>
									<div class="time ">{{item.time}}</div>
								</div>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>

	/**
	 * 格式化时间的辅助类，将一个时间转换成x小时前、y天前等
	 */
	var dateUtils = {
		UNITS: {
			'年': 31557600000,
			'月': 2629800000,
			'天': 86400000,
			'小时': 3600000,
			'分钟': 60000,
			'秒': 1000
		},
		humanize: function(milliseconds) {
			var humanize = '';
			mui.each(this.UNITS, function(unit, value) {
				if(milliseconds >= value) {
					humanize = Math.floor(milliseconds / value) + unit + '前';
					return false;
				}
				return true;
			});
			return humanize || '刚刚';
		},
		format: function(dateStr) {
			console.log(dateStr);
			var date = this.parse(dateStr)
			
			var diff = Date.now() - date.getTime();
			if(diff < this.UNITS['天']) {
				return this.humanize(diff);
			}
			
			var _format = function(number) {
				return(number < 10 ? ('0' + number) : number);
			};
			return  _format(date.toLocaleDateString()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
		},
		parse: function(str) { //将"yyyy-mm-dd HH:MM:ss "格式的字符串，转化为一个Date对象
		
			var a = str.split(/[^0-9]/);
			return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
		}
	};
	//import dateUtils from '../../module/dateUtils'
	export default {
		data () {
			return {
						flag: 5,
						flag2: 0,
						lastId: '',
						minId : '',//最新新闻的id 
					    webview_detail : null, //详情页webview
					    items:[],
					    targetUrl:'',
						url:{},
						banner:[{},{},{}],//这里必须先初始化
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
		created () {
					let _this = this;
					
				},
		mounted () {
				let _this = this;
				mui.init({	
						swipeBack: true ,//启用右滑关闭功能
						pullRefresh: {
							container: '#list',
							down: {
								style: 'circle',
								offset: '0px',
								auto: false,
								callback: _this.pulldownRefresh
							},
							up: {
								height: 100,
								contentrefresh: '正在加载...',
								contentnomore:'没有更多数据...',//可选，请求完毕若没有更多数据时显示的提醒内容；
								callback: _this.pullupRefresh
								}
						}
					});
					document.addEventListener("getUrl",function(event){
						_this.url= event.detail.response;
						console.log("url ");
						console.log(event.detail.response);
						_this.targetUrl = _this.url.oldCampusInfoURL;
						console.log("_this.url.oldCampusInfoURL " + _this.url.oldCampusInfoURL);
						_this.pulldownRefresh()
					})
					var item2Show = false,item3Show = false;//子选项卡是否显示标志
					document.querySelector('.mui-slider').addEventListener('slide', function(event) {
						if (event.detail.slideNumber === 0) {
						   _this.targetUrl = _this.url.oldCampusInfoURL;
							console.log("_this.url.oldCampusInfoURL " + _this.url.oldCampusInfoURL);
							_this.pulldownRefresh()
						 }	
					    else if (event.detail.slideNumber === 1) {
						    _this.targetUrl = _this.url.oldHotTopicURL;
						    console.log("_this.url.oldHotTopicURL " +  _this.url.oldHotTopicURL)
						    	_this.pulldownRefresh();
					  } else if (event.detail.slideNumber === 2) {
					     	_this.targetUrl = _this.url.oldNewRuleURL;
					     	console.log("_this.url.oldNewRuleURL " + _this.url.oldNewRuleURL);
					     	_this.pulldownRefresh();
					  }
					});
		},
		methods:{
			pulldownRefresh () {
				let _this = this;
				if(window.plus && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
					plus.nativeUI.toast('似乎已断开与互联网的连接', {
						verticalAlign: 'top'
					});
				return;
				}
				console.log('_this.url.newestTopicURL');
				console.log(_this.url.newestTopicURL);
				mui.getJSON(_this.url.newestTopicURL, {}, function(rsp) {
					_this.banner = _this.convert(rsp)
				});
				mui("#slider").slider({interval: 0});//在ajax后加上这一句，手机端轮播图才会滚动interval为0表示不自动播放
				
				mui.getJSON(_this.targetUrl, {}, function(rsp) {
					
					_this.items = [];
					mui('#list').pullRefresh().endPulldownToRefresh();
					if(rsp && rsp.length > 0) {
						_this.lastId = rsp[0].id; //保存最新消息的id，方便下拉刷新时使用
						
						if(_this.flag === 5 && _this.flag2 === 0){
								_this.flag2 = 1;
								rsp = rsp.slice(0,5);
								_this.items = _this.convert(rsp).concat(_this.items);
						}
						else if(_this.flag >= rsp.length){
							_this.items = _this.convert(rsp);
							
						}
							_this.items = _this.convert(rsp).concat(_this.items);	
						}
					
				});
				mui.plusReady(function() {
				//预加载详情页
				console.log("预加载成功 ")
				_this.webview_detail = mui.preload({
					url: 'detail.html',
					id: 'news_detail',
					styles: {
						"render ": "always ",
						"popGesture ": "hide ",
						"bounce ": "vertical ",
						"bounceBackground ": "#efeff4 ",
						"titleNView ":_this.titleNView
					}
				});
			});
			},
			/**
			 * 上拉加载拉取历史列表 
			 */
			pullupRefresh() {
				let _this = this;
				mui.getJSON(_this.targetUrl,{}, function(rsp) {
					console.log("content " + rsp[0].contentURL);
					mui('#list').pullRefresh().endPullupToRefresh(true);
					if(rsp && rsp.length > 0 && _this.flag < rsp.length) {
						_this.minId = rsp[rsp.length - 1].id; //保存最后一条消息的id，上拉加载时使用
						rsp = rsp.slice(_this.flag+1,_this.flag + 4);
						_this.flag += 3;
						_this.items = _this.items.concat(_this.convert(rsp));
					}
				});
			},
			/**
			 * 1、将服务端返回数据，转换成前端需要的格式
			 * 2、若服务端返回格式和前端所需格式相同，则不需要改功能
			 * 
			 * @param {Array} items 
			 */
			convert(items) {
				let _this = this;
				var newItems = [];
				items.forEach(function(item) {
					newItems.push({
						guid: item.id,
						title: item.title,
						kind: _this.switchKind(item.kind),
						cover: item.cover,
						content_url : item.contentURL,//七牛上返回的contenturl
						time: dateUtils.format(item.time),
						month: item.month,
						source: item.source
					});
				});
				return newItems;
			},
			 open_detail (item) {
			 	console.log("open_datail " +  item.content_url);
				let _this = this;
			//触发子窗口变更新闻详情
				mui.fire(_this.webview_detail, 'get_detail', {
				guid: item.guid,
				title: item.title,
				kind: item.kind,
				time: item.time,
				cover: item.cover,
				content_url: item.content_url,//添加到data中的contnet_url,
				month: item.month,
				source: item.source
			});
		
			//更改详情页原生导航条信息
			_this.titleNView.titleText = item.title;
			
			_this.webview_detail.setStyle({
				"titleNView ": _this.titleNView
			});
			setTimeout(function() {
				console.log("i am detailwebview")
				console.log(	_this.webview_detail)
				_this.webview_detail.show("slide-in-right ", 300);
//				_this.webview_detail.show("")
			}, 150);
			
		},
		switchKind(kind){
			switch (kind){
				case "newRule":
					return "新法新规";
					break;
				case "hotTopic":
					return "热门话题";
					break;
				case "campusInfo":
					return "校园资讯";
			}
		}
			
		}

}
</script>

<style>
	
    #slider img{
        height: 200px;
    }

	.mui-media {
				font-size: 14px;
			}
			
			.mui-table-view .mui-media-object {
				max-width: initial;
				width: 90px;
				height: 70px;
			}
			
			.meta-info {
				position: absolute;
				left: 115px;
				right: 15px;
				bottom: 8px;
				color: #8f8f94;
			}
			
			.meta-info .author,
			.meta-info .time {
				display: inline-block;
			}
			
			.meta-info .time {
				float: right;
			}
			
			.mui-table-view:before,
			.mui-table-view:after {
				height: 0;
			}
			
			.mui-content>.mui-table-view:first-child {
				margin-top: 1px;
			}
			
			.banner {
				height: 180px;
				overflow: hidden;
				position: relative;
				background-position: center;
				background-color: #ccc;
			}
			
			.banner img {
				width: 100%;
				height: auto;
			}
			
			.banner .title {
				position: absolute;
				left: 15px;
				bottom: 15px;
				width: 90%;
				font-size: 16px;
				font-weight: 400;
				line-height: 21px;
				color: white;
				z-index: 11;
			}
            /*.mui-bar-nav~.mui-content .mui-pull-bottom-pocket{
            		bottom:50px !important;
            		
            }*/
         
</style>


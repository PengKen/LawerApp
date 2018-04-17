<template>
  <div id="app">
  	<!--<header class="mui-bar mui-bar-nav" >
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 id="title" class="mui-title">首页</h1>
	</header>-->
		<nav class="mui-bar mui-bar-tab" id="index-nav">
			<a id="defaultTab" class="mui-tab-item mui-active" href="home.html" @tap="gohome">
				<span class="iconfont icon-home-g"></span>
				<span class="mui-tab-label">首页</span>
				
			</a>
			<a class="mui-tab-item" href="onlook.html" @tap="goonlook">
				<span class="iconfont icon-yanjing"></span>
				<span class="mui-tab-label">围观</span>
			</a>
			<a class="mui-tab-item" href="tab-webview-subpage-contact.html" @tap="golistview">
				<span class="iconfont icon-faxian"></span>
				<span class="mui-tab-label">发现</span>
			</a>
			<a class="mui-tab-item" href="tab-webview-subpage-setting.html" @tap="gopersonal">
				<span class="iconfont icon-wode"></span>
				<span class="mui-tab-label">我的</span>
			</a>
		</nav>
    
  </div>
</template>

<script>
	
			mui.init();
			var subpages = ['home.html', 'onlook.html', 'listview.html', 'personal.html'];
			var subpage_style = {
				top: '0px',
				bottom: '51px'
			};
			var titleNView = {
							top: '0px',
							bottom: '51px',
                            backgroundColor: '#f7f7f7', //导航栏背景色
                            titleText: '透明渐变(native模式)', //导航栏标题
                            titleColor: '#000000', //文字颜色
                            type: 'transparent', //透明渐变样式
                            autoBackButton: true, //自动绘制返回箭头
                            splitLine: { //底部分割线
                                color: '#cccccc'
                            }
                       };
			var aniShow = {};
			
			 //创建子页面，首个选项卡页面显示，其它均隐藏；
			mui.plusReady(function() {
				var userInfo = {};
				document.addEventListener("get_userInfo",(event)=>{
					userInfo = event.detail.userInfo;
					
				})
				var self = plus.webview.currentWebview();
				for (var i = 0; i < 4; i++) {
					var temp = {};
					if(i == 0){
						var sub = plus.webview.create(subpages[i], subpages[i], {top: '0px',bottom: '51px'});
					}else{
						var sub = plus.webview.create(subpages[i], subpages[i], titleNView);
					}
//					if (i > 0) {
//						sub.hide();
//					}else{
//						temp[subpages[i]] = "true";
//						mui.extend(aniShow,temp);
//						
//					}
					self.append(sub);
					
				}
			});
			 //当前激活选项
			var activeTab = subpages[0];
			var title = document.getElementById("title");
			// 选项卡点击事件
//			mui('.mui-bar-tab').on('tap', 'a', function(e) {
//				var targetTab = this.getAttribute('href');
//				if (targetTab == activeTab) {
//					return;
//				}
//				//更换标题
//				title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
//				//显示目标选项卡
//				//若为iOS平台或非首次显示，则直接显示
//				if(mui.os.ios||aniShow[targetTab]){
//					plus.webview.show(targetTab);
//				}else{
//					//否则，使用fade-in动画，且保存变量
//					var temp = {};
//					temp[targetTab] = "true";
//					mui.extend(aniShow,temp);
//					plus.webview.show(targetTab,"fade-in",300);
//				}
//				//隐藏当前;
//				plus.webview.hide(activeTab);
//				//更改当前活跃的选项卡
//				activeTab = targetTab;
//			});

			export default {
			  name: 'App',
			  data () {
			  	return {
			  		listviewUrl:{
			  			newestTopicURL: "",
			  			oldNewRuleURL: "",
			  			oldCampusInfoURL: "",
			  			oldHotTopicURL: ""
			  		},
			  		resizeFlag: false,
			  		userInfo:{},
			  		headerShow:false
				}
			},
			mounted() {
				document.addEventListener("get_userInfo",(event)=>{
					this.userInfo = event.detail.userInfo;
					this.$store.commit("newUserInfo",event.detail.userInfo)
					this.gohome();
				})
				
			 },
			  methods:{
			  	gohome () {
			  		let page = plus.webview.getWebviewById('home.html');
		  			if(page){
			  		
			  			mui.fire(page,'getUserInfo',{
			  				userInfo: this.userInfo
			  			})
		  			}
			  		mui.plusReady(function() {
						plus.navigator.setStatusBarBackground('#87CEFA');
						plus.navigator.setStatusBarStyle("light");
					
					// 关闭侧滑返回功能
					plus.webview.currentWebview().setStyle({
						'popGesture': 'none'});
				});
					this.openWindow("home.html","home.html")
			  	},
			  	goonlook () {
			  		
			  		let page = plus.webview.getWebviewById('onlook.html');
		  			if(page){
			  			mui.fire(page,'getUserInfo',{
			  				userInfo: this.userInfo
			  			})
		  			}
			  		
			  		this.openWindow("onlook.html","onlook.html");
			  	},
			  	golistview () {
			  		
			  		var _this = this;
			  		this.$post('/GetNewURL.do',{
			  			token: _this.$store.state.userInfo.token,
			  			userid: _this.$store.state.userInfo.userID
			  		}).then((response) => {
			  				
			  				let page = plus.webview.getWebviewById('listview.html');  
			  			if(page){
				  			mui.fire(page,'getUrl',{
				  				response: response
				  			})
			  			}
			  		}).catch((err) =>{
			  			
			  		})
			  		
					this.openWindow("listview.html","listview.html");
			  	},
			  	gopersonal () {
			  		
			  		
		  			let page = plus.webview.getWebviewById('personal.html');
		  			if(page){
			  			console.log("page personal");
			  			mui.fire(page,'getUserInfo',{
			  				userInfo: this.userInfo
			  			})
		  			}
			  		this.openWindow("personal.html","personal.html");
			  	},
			  	openWindow(url,id,param){
			  	mui.openWindow({
					
						url: url,
						id: id,
						extras: {
							listviewUrl: param
						},
						createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
						show: {
							autoShow: true //页面loaded事件发生后自动显示，默认为true
//							aniShow: animationType, //页面显示动画，默认为”slide-in-right“；
//							duration: animationTime //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
						},
						waiting: {
							autoShow: true, //自动显示等待框，默认为true
							title: '正在加载...' //等待对话框上显示的提示内容
						}
					})
			}
		}
			  
	}
</script>

<style>
	*{
		margin: 0;
		padding: 0;
	}
	#app {
		height: 100%;
	}
	#index-nav .iconfont{
		display: block;
		width: 94px;
		font-size: 24px;
		padding-top: 5px;
		
	}
	#index-nav .mui-tab-label{
		display: block;
		width: 94px;
		font-size: 11px;
	
	}
	#index-nav a{
		padding: 2px 0;
	}
</style>

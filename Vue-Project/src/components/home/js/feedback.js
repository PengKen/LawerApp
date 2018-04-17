var feedback = function (callback) {
					var index = 1;
					var size = null;
					var imageIndexIdNum = 0;
					var starIndex = 0;
					var feedback = {
						question: document.getElementById('question'), 
						contact: document.getElementById('contact'), 
						imageList: document.getElementById('image-list'),
						submitBtn: document.getElementById('submit')
					};
					var url = 'https://service.dcloud.net.cn/feedback';
					feedback.files = [];
					feedback.uploader = null;  
					feedback.deviceInfo = null;
					feedback.content = null;
					feedback.imagesBase64 = [];
					mui.plusReady(function() {
						//设备信息，无需修改
						feedback.deviceInfo = {
							appid: plus.runtime.appid, 
							imei: plus.device.imei, //设备标识
							images: feedback.files, //图片文件
							p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
							md: plus.device.model, //设备型号
							app_version: plus.runtime.version,
							plus_version: plus.runtime.innerVersion, //基座版本号
							os:  mui.os.version,
							net: ''+plus.networkinfo.getCurrentType()
						}
					});
					/**
					 *提交成功之后，恢复表单项 
					 */
					feedback.clearForm = function() {
						feedback.question.value = '';
						feedback.contact.value = '';
						feedback.imageList.innerHTML = '';
						feedback.newPlaceholder();
						feedback.files = [];
						feedback.imagesBase64 = [];
						feedback.content = null;
						index = 0;
						size = 0;
						imageIndexIdNum = 0;
						starIndex = 0;
						
					};
					feedback.getFileInputArray = function() {
						return [].slice.call(feedback.imageList.querySelectorAll('.file'));
					};
					feedback.addFile = function(path) {
						feedback.files.push({name:"images"+index,path:path,id:"img-"+index});
						index++;
					};
					/**
					 * 初始化图片域占位
					 */
					feedback.newPlaceholder = function() {
						var fileInputArray = feedback.getFileInputArray();
						if (fileInputArray &&
							fileInputArray.length > 0 &&
							fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
							return;
						};
						imageIndexIdNum++;
						var placeholder = document.createElement('div');
						placeholder.setAttribute('class', 'image-item space');
						var up = document.createElement("div");
						up.setAttribute('class','image-up')
						//删除图片
						var closeButton = document.createElement('div');
						closeButton.setAttribute('class', 'image-close');
						closeButton.innerHTML = 'X';
						closeButton.id = "img-"+index;
						//小X的点击事件
						closeButton.addEventListener('tap', function(event) {
							setTimeout(function() {
								for(var temp=0;temp<feedback.files.length;temp++){
									if(feedback.files[temp].id==closeButton.id){
										feedback.files.splice(temp,1);
									}
								}
								feedback.imageList.removeChild(placeholder);
							}, 0);
							return false;
						}, false);
						
						//
						var fileInput = document.createElement('div');
						fileInput.setAttribute('class', 'file');
						fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
						fileInput.addEventListener('tap', function(event) {
							if(feedback.files.length === 3){
								return ;
							}
							var self = this;
							var index = (this.id).substr(-1);
							plus.gallery.pick(function(e) {
								if (!self.parentNode.classList.contains('space')) { //已有图片
										feedback.files.splice(index-1,1,{name:"images"+index,path:e});
									} else { //加号
										placeholder.classList.remove('space');
										feedback.addFile(e);
										feedback.newPlaceholder();
									}
									up.classList.remove('image-up');
								placeholder.style.backgroundImage = 'url(' + e + ')';
//							console.log("event:"+e);
//								var name = e.substr(e.lastIndexOf('/') + 1);
//								console.log("name:"+name);
//									
//								plus.zip.compressImage({
//									src: e,
//									dst: '_doc/' + name,
//									overwrite: true,
//									quality: 50
//								}, function(zip) {
//									size += zip.size  
//									console.log("filesize:"+zip.size+",totalsize:"+size);
//									if (size > (10*1024*1024)) {
//										return mui.toast('文件超大,请重新选择~');
//									}
//									if (!self.parentNode.classList.contains('space')) { //已有图片
//										feedback.files.splice(index-1,1,{name:"images"+index,path:e});
//									} else { //加号
//										placeholder.classList.remove('space');
//										feedback.addFile(zip.target);
//										feedback.newPlaceholder();
//									}
//									up.classList.remove('image-up');
//									placeholder.style.backgroundImage = 'url(' + zip.target + ')';
//									console.log("zip.target" + zip.target);
//								}, function(zipe) {
//									mui.toast('压缩失败！')
//								});
							}, function(e) {
								//mui.toast(e.message);
							},{});
						}, false);
						placeholder.appendChild(closeButton);
						placeholder.appendChild(up);
						placeholder.appendChild(fileInput);
						feedback.imageList.appendChild(placeholder);
					};
					feedback.newPlaceholder();
					feedback.submitBtn.addEventListener('tap', function(event) {
						if (feedback.question.value.length < 20 ||
							(feedback.contact.value != '' &&
								feedback.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) != 0)) {
							return mui.toast('信息填写不符合规范');
						}
						if (feedback.question.value.length > 200 || feedback.contact.value.length > 200) {
							return mui.toast('信息超长,请重新填写~')
						}
						//判断网络连接
						if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
							return mui.toast("连接网络失败，请稍后再试");
						}
						feedback.send(mui.extend({}, feedback.deviceInfo, {
							content: feedback.question.value,
							contact: feedback.contact.value,
							images: feedback.files,
							score:''+starIndex
						})) 
					}, false)
					feedback.send = function(content) {
//						feedback.uploader = plus.uploader.createUpload(url, {
//							method: 'POST'
//						}, function(upload, status) {
//				//			plus.nativeUI.closeWaiting()
//							console.log("upload cb:"+upload.responseText);
//							if(status==200){
//								var data = JSON.parse(upload.responseText);
//								//上传成功，重置表单
//								if (data.ret === 0 && data.desc === 'Success') {
//				//					mui.toast('反馈成功~')
//									console.log("upload success");
//				//					feedback.clearForm();
//								}
//							}else{
//								console.log("upload fail");
//							}
//							
//						});
						//添加上传数据
//						mui.each(content, function(index, element) {
//							if (index !== 'images') {
//								console.log("addData:"+index+","+element);
//				//				console.log(index);
//								feedback.uploader.addData(index, element)
//							} 
//						});
						//添加上传文件
						mui.each(feedback.files, function(index, element) {
							var f = feedback.files[index].path;
							getBase64(f,(dataURL)=>{
								feedback.imagesBase64.push(dataURL);
								if(feedback.imagesBase64.length === feedback.files.length){
									console.log("imgs length " + feedback.imagesBase64.length);
									callback?callback(feedback.imagesBase64,content.content):null;
								}
							})
							//feedback.imagesBase64.push(getBase64(f));
							console.log("addFile:"+JSON.stringify(f));
//							feedback.uploader.addFile(f.path, {
//								key: f.name
//							});
						});
						if(feedback.files.length < 1){
							callback?callback([],content.content):null;
						}
						
						//开始上传任务
						//feedback.uploader.start();\n
						console.log("64 length " + feedback.imagesBase64.length)
//						while(feedback.imagesBase64.length != feedback.files.length) ;
						
						mui.alert("感谢反馈，点击确定关闭","问题反馈","确定",function () {
							feedback.clearForm();
							mui.back();
						});
						//plus.nativeUI.showWaiting();
					};
				
				};

		function getBase64(f,callback,callback2){
		 		
		        //通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
				var Img = new Image();
				var dataURL = '';
				Img.src = f;
				
				Img.onload = function() { //要先确保图片完整获取到，这是个异步事件
				var canvas = document.createElement("canvas"); //创建canvas元素
				var	width = Img.width; //确保canvas的尺寸和图片一样
				var	height = Img.height;
				canvas.width = width;
				canvas.height = height;
				canvas.getContext("2d").drawImage(Img, 0, 0, width, height); //将图片绘制到canvas中
				dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
				callback?callback(dataURL):null;
			};
		}
export {feedback};
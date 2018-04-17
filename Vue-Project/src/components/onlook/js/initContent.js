			var initContent = function() {
				
				let cardContent = this.$refs.content;
				let realHeight = cardContent.scrollHeight;
				let standardHeight =  parseInt(document.documentElement.style.fontSize) * 0.8 * 4;
				if(realHeight >= standardHeight){
					cardContent.style.webkitLineClamp = 4;
					//document.getElementsByClassName("getMore")[0].style.display = "block";
					this.showMore = true;
				}
				
			}
			var	getMore =function () {
				//console.log("index " + this.index + " togglemore " + this.toggleMore);
				if(this.toggleMore === '0'){
					this.$refs.getMore.innerText = "收起全文";
					this.$refs.content.style.webkitLineClamp = "998";
					this.toggleMore = '1';
				
				}
				else{
					this.$refs.getMore.innerText = "展开更多";
					this.$refs.content.style.webkitLineClamp = "4";
					this.toggleMore = '0';
				}
			}
		export { initContent, getMore };

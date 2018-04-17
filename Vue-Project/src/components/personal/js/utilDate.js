	var utilDate = {
		UNITS: {
			'年': 31557600000,
			'月': 2629800000,
			'天': 86400000,
			'小时': 3600000
//			'分钟': 60000,
//			'秒': 1000
		},
		humanize: function(milliseconds) {
			var humanize = '';
			mui.each(this.UNITS, function(unit, value) {
				if(milliseconds >= value) {
					humanize = Math.floor(milliseconds / value)  +" "+ unit + '前';
					return false;
				}
				return true;
			});
			return humanize || '刚刚';
		},
		format: function(dateStr) {
			var date = this.parse(dateStr)
			
			var diff = Date.now() - date.getTime();
			if(diff < this.UNITS['天']) {
				
				return this.humanize(diff);
			}else if(diff > this.UNITS['天'] && diff <= (this.UNITS['天'] * 3)){
				return this.humanize(diff);
			}
			
			var _format = function(number) {
				console.log(number);
				return(number < 10 ? ('0' + number) : number);
			};
			//return  _format(date.toLocaleDateString()) + '-' + _format(date.getHours()) + ':' + _format(date.getMinutes());
			return  _format(date.toLocaleDateString()).replace(/\//g,'-');
		},
		parse: function(str) { //将"yyyy-mm-dd HH:MM:ss "格式的字符串，转化为一个Date对象

			var a = str.split(/[^0-9]/);
			return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
		}
	};
export { utilDate };

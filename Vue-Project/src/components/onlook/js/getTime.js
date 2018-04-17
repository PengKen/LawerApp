var getTime = function(){
			var k = new Date();
			return (k.getFullYear() + "-" + (k.getMonth()+1) + "-" +  k.getDate() + 
					" " + k.getHours()+ ":" +  
					k.getMinutes() + ":" + k.getSeconds());
}

export { getTime };

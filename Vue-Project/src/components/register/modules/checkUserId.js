var checkUserId = function(){
		this.$get("http://p31o5rsje.bkt.clouddn.com/NewestTopic4.txt").then((response) => {
		console.log(response);
		if(response.result === "yes"){
			document.getElement
		}
		else{
			
		}
	}).catch((err) => {
		console.log(err);
	})
			
}
exports.checkUserId = checkUserId;
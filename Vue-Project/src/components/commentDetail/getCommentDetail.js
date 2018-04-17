var getCommentDetail = function(event){
	console.log("get_commentDetail");
				console.log(event.detail.commentDetail);
				_this.$store.commit("newCurOnlookItem", event.detail.onlookItem)
				console.log(this.onlookItem.questionid);
				_this.$store.commit('newUserInfo', event.detail.userInfo);
				_this.$post('/GetComment.do', {
					questionid: _this.onlookItem.questionid
			
				}).then((res)=> {
					_this.$store.commit('newCommentItems', res);
					//						_this.commentItems = res;
				})
}
export { getCommentDetail };

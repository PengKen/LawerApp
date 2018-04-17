import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
			onlookItems:[],
			commentItems:[],
			curOnlookItem:null,
			collectIDs:[],
			userInfo:{
				userID:"",
				userName: "",
				userPassword: "",
				portrait: "",
				email: "",
				token: "",
				message:"",
				major:''
			}
		//在任意组件中通过{{ this.$store.state.author }}来获得
	},
	mutations: {
		newOnlookItems (state,newOnlookItems){
			state.onlookItems = newOnlookItems;
		},
		newUserInfo (state,newUserInfo){
			state.userInfo = newUserInfo;
		},
		newCommentItems(state,newCommentItems){
			state.commentItems = newCommentItems;
		},
		newCollectIDs(state,newCollectIDs){
			
			state.collectIDs = newCollectIDs
		},
		newCurOnlookItem(state,newCurOnlookItem){
			state.curOnlookItem = newCurOnlookItem;
			console.log("commit");console.log(newCurOnlookItem);
		}
		//在任意组件的方法中通过this.$store.commit('newAuthor'，'newParam')来修改
	}
})
export default store;
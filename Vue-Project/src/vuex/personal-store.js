import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
			userInfo:{
				userID:"",
				userName: "",
				userPassword: "",
				portrait: "",
				email: "",
				token: "",
				message:"",
				
			},
			collections:[]
		//在任意组件中通过{{ this.$store.state.author }}来获得
	},
	mutations: {
		newUserInfo (state,newUserInfo){
			state.userInfo = newUserInfo;
		},
		newCollections (state,newcollections){
			state.collections = newcollections;
		}
		
		//在任意组件的方法中通过this.$store.commit('newAuthor'，'newParam')来修改
	}
})
export default store;
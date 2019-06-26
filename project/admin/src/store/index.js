import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import side from './modules/side'
import user from './modules/user'
import permission from './modules/permission'
import article from './modules/article'
Vue.use(Vuex)
/*
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
1.多个视图依赖于同一状态。
2.来自不同视图的行为需要变更同一状态。
*/
const store = new Vuex.Store({
	// 全局状态，可以放在这
	// state:{
	// 	a:'我是根目录的变量a',
	// 	b:800
	// },
	// getters:{
	// 	numGet:state => state.b = 100
	// },
	modules:{
		side,
		permission,
		user,
		article
	},
	getters,
})

export default store






















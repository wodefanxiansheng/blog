import { Local } from 'src/utils/storage'//本地存储
const state = {
	isCollapse:Local.get('slideBarStatus'),//收缩左侧菜单栏
	tagViews:JSON.parse(Local.get('tagViews')) || [],//顶部导航栏添加（面包屑）
	is_add_router:false,//是否添加路由
	text:'',
}

const mutations = {
	// 展开收缩左侧导航栏
	TOGGLE_SIDEBAR(state){
		if(state.isCollapse){//判断leftbar为true展开，则为false（关闭）
			Local.set('slideBarStatus',false)
		}else{
			Local.set('slideBarStatus',true)
		}
		state.isCollapse = !state.isCollapse;
	},
	// 面包屑导航路由的添加和删除
	ADD_TAGVIEW(state,tag){
		if(state.tagViews.some(v => v.name === tag.name)) return;//返回一个bool值
		state.tagViews.push({name:tag.name,path:tag.path});
		Local.set('tagViews',JSON.stringify(state.tagViews));//存值
	},
	DEL_TAGVIEW(state,tag){
		let index;
		for(let[i,v] of state.tagViews.entries()){
			if(v.name === tag.name) index = i;
		}
		state.tagViews.splice(index,1);
		Local.set('tagViews',JSON.stringify(state.tagViews));
	}
}
// 异步状态
const actions = {
	toggleSideBar({ commit,rootState,rootGetters}) {
		// console.log(rootGetters.numGet)
        commit('TOGGLE_SIDEBAR');
    },
    addTagView({commit}, tag) {
        commit('ADD_TAGVIEW', tag);
    },
    delTagView ({commit}, tag) {
        commit('DEL_TAGVIEW', tag)
    }
}


export default{
	namespaced: true,
    state,
    actions,
    mutations,
    // getters
};
// export {
// 	app,
// }
/*
	export 和 export default 的共同点和区别
	共同点：
	export与export default均可用于导出常量、函数、文件、模块等
	区别：
	1.在一个文件或模块中，export、import可以有多个，export default仅有一个
	2.通过export方式导出，在导入时要加{}，export default则不能加
	使用export default命令，为模块指定默认输出，这样在import的时候，可以自定义该模块的名字，不需要知道模块本身的变量名
 */














































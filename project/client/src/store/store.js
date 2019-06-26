import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate"//用于在浏览器刷新后 保存 vuex 状态的小插件
Vue.use(Vuex);

const store =  new Vuex.Store({
    state:{
        errortip:false,//错误提示的现实状态
        errortipContent:"",//错误提示的内容
        nowId:"1",
        articleId:"",
        recipientName:"",
        _id:"",
        todos: [
             {id: 1, done: true, text: '我是码农'},
             {id: 2, done: false, text: '我是码农202号'},
             {id: 3, done: true, text: '我是码农202号'}
        ],
        num:100
    },
    getters:{
        getToDo (state) {
            return state.todos.filter(item => item.done === true)
            // filter 迭代过滤器 将每个item的值 item.done == true 挑出来， 返回的是一个数组
        }
    },
    // plugins: [createPersistedState({ storage: window.sessionStorage })],
    mutations:{
        getErrortip(state,errortip){
            state.errortip = errortip;
        },
        getErrortipContent(state,errortipContent){
            state.errortipContent = errortipContent;
        },
        getnowId(state,nowId){
            state.nowId = nowId;
        },
        getarticleId(state,articleId){
            state.articleId = articleId;
        },
        getrecipientName(state,recipientName){
            state.recipientName = recipientName;
        },
        get_id(state,_id){
            state._id = _id;
        },
        numGet(state){
            state.num += 500;
            console.log(state.num)
        }
    },
   
})

export default store


























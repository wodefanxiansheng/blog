import { loginByUsername,getUserInfo,addUserlist,adminUserLists,editUser,delUser} from 'src/api/login'
import { getToken, setToken, removeToken } from 'src/utils/auth'
// console.log(login)
const user = {
  state: {
        userList: [],//用户数组
        userTotal: 0,//用户总的数
        name: '',
        username: '',
        roles: null,
        token: getToken(),
        otherList: []
  },

  mutations: {
 //    SET_TOKEN (state, token) {//设置token
	// 		state.token = token;
	// },
	SET_USERINFO (state, info) {//设置用户信息
		state.name = info.name;//用户名
		state.username = info.username;//用户登陆账号
		state.roles = info.roles;//用户权限
	},
	USERLIST (state, data) {//用户表
		state.userList = data.result;
		state.userTotal = data.totalCount;
	},
	CLEARINFO (state) {//清除用户信息
        removeToken();
		state.name = '';
		state.username = '';
		state.roles = null;
	},
  },

  actions: {
    // 用户名登录
    LoginByUsername({ state,commit }, userInfo) {
	      // let {username,password} = userInfo;
	      return new Promise((resolve, reject) => {
	      		// 调用api里面的user文件登录接口
		        loginByUsername(userInfo).then(res => {
		        	// 用户登录之后，后台会把用户信息生成jsonwebtoken存到cookie里面
		        	//客户端直接获取后台存的token
                    state.token = getToken()
		        	resolve(res)
		        }).catch(error => {
		          	reject(error)
		        })
	      })
    },
    // 客户端获取token之后，直接传给后台，后台破解，返还给客户端用户的具体信息和权限
    GetUserInfo({state,commit}){
    	return new Promise((resolve,reject) =>{
    		getUserInfo(state.token).then(res =>{
                commit('SET_USERINFO',res.data.data)
    			resolve(res)
    		}).catch(error=>{
    			
    			reject(error)
    		})
    	})
    },
    // 退出，清除用户信息
    Logout({state,commit}){
    	commit('CLEARINFO')
    },
    // 添加管理员
    AddUserlist({state,commit},ruleForm){
        return new Promise((resolve,reject) =>{
            addUserlist(ruleForm).then(res =>{
                resolve(res)
            }).catch(error =>{
                console.log(error)
            })
        })
    },
    // 管理员列表
    AdminUserLists({state,commit},data){
        return new Promise((resolve,reject) =>{
            adminUserLists(data).then(res =>{
                // console.log(res)
                commit('USERLIST',res.data)
                resolve(res)
            }).catch(error =>{
                console.log(error)
            })
        })
    },
    //编辑管理员
    EditUser({state,commit},data){
        return new Promise((resolve,reject) =>{
            editUser(data).then(res =>{
                resolve(res)
            }).catch(error =>{
                reject(error)
            })  
        })
    },
    //删除管理员
    DelUser({state,commit},data){
        return new Promise((resolve,reject) =>{
            delUser(data).then(res =>{
                // console.log(res)
                resolve(res)
            }).catch(error =>{
                reject(error)
            })
        })
    }


  }
}

export default user

import request from '@/utils/request'
// 登录，登出，获取用户信息接口页面
const prefix = '/api/'
export function loginByUsername(data) {
	return request({
		url:prefix + 'users/login',
		method:'post',
		data
	})
}

export function getUserInfo(token) {
	return request({
		url:prefix + 'users/info',
		method:'post',
		data:{
			token:token
		}
	})
}
// 添加管理员
export function addUserlist(data) {
	return request({
		url:prefix + 'users/addUser',
		method:'post',
		data
	})
}

// 管理员列表
export function  adminUserLists(data){
	return request({
		url:prefix + 'users/adminUserLists',
		method:'get',
		params:data
	})
}
// 编辑管理员

export function editUser(data){
	return request({
		url:prefix + 'users/editUser',
		method:'post',
		data
	})
}

export function delUser(data){
	return request({
		url:prefix + 'users/deleteUser',
		method:'post',
		data
	})
}



















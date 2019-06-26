import request from '@/utils/request'
// 登录，登出，获取用户信息接口页面
const prefix = '/api/';
export function commentsList(data) {
	return request({
		url:prefix + 'blog/commentsList',
		method:'get',
		params:data
	})
}
export function deleteComment(data) {
	return request({
		url:prefix + 'blog/deleteComment',
		method:'post',
		data
	})
}










































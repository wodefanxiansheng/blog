import request from '@/utils/request'
// 登录，登出，获取用户信息接口页面
const prefix = '/api/';
export function uploadVideo(data) {
	return request({
		url:prefix + 'blog/uploadVideo',
		method:'post',
		data
	})
}

export function videoInfo(data) {
	return request({
		url:prefix + 'blog/videoInfo',
		method:'post',
		data
	})
}

export function videolists(data) {
	return request({
		url:prefix + 'blog/videolists',
		method:'get',
		params:data
	})
}

export function deleteVideo(data) {
	return request({
		url:prefix + 'blog/deleteVideo',
		method:'post',
		data
	})
}

export function deleteSelectAllVideo(data) {
	return request({
		url:prefix + 'blog/deleleAllVideo',
		method:'post',
		data
	})
}
export function videoUpdate(data) {
	return request({
		url:prefix + 'blog/videoUpdate',
		method:'post',
		data
	})
}
export function videoDetail(data) {
	return request({
		url:prefix + 'blog/videoDetail',
		method:'post',
		data
	})
}


























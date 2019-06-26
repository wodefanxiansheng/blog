import request from '@/utils/request'
// 登录，登出，获取用户信息接口页面
const prefix = '/api/';
export function addBlog(data) {
	return request({
		url:prefix + 'blog/addBlog',
		method:'post',
		data
	})
}
export function uploadImages(data) {
	return request({
		url:prefix + 'blog/uploadImages',
		method:'post',
		data
	})
}

export function blogLists(data) {
	return request({
		url:prefix + 'blog/blogLists',
		method:'get',
		params:data
	})
}

export function blogDetail(data) {
	return request({
		url:prefix + 'blog/blogDetail',
		method:'post',
		data
	})
}

export function deleteBlog(data) {
	return request({
		url:prefix + 'blog/deleteBlog',
		method:'post',
		data
	})
}
// 更新博客
export function updateBlog(data) {
	return request({
		url:prefix + 'blog/update',
		method:'post',
		data
	})
}
// 分类
export function getClass() {
	return request({
		url:prefix + 'blog/getClass',
		method:'post',
	})
}
// 更新禁用状态
export function updateType(data) {
	return request({
		url:prefix + 'blog/updateType',
		method:'post',
		data
	})
}
// 编辑分类名字
export function editClass(data) {
	return request({
		url:prefix + 'blog/editClass',
		method:'post',
		data
	})
}
// 删除分类
export function deleteClass(data) {
	return request({
		url:prefix + 'blog/deleteClass',
		method:'post',
		data
	})
}
// 添加分类
export function addFenlei(data) {
	return request({
		url:prefix + 'blog/addFenlei',
		method:'post',
		data
	})
}


































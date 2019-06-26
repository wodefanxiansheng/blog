import request from '@/utils/request'
// 登录，登出，获取用户信息接口页面
const prefix = '/api/';
export function dashboardData() {
	return request({
		url:prefix + 'dashboard/echart',
		method:'get',
	})
}













































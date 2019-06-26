import { Cookie } from './storage'
const TokenKey = 'Token-Auth'
// 设置tokenkey
export function getToken() {  
	return Cookie.get(TokenKey)
}

export function setToken(token) {
  return Cookie.set(TokenKey, token)
}

export function removeToken() {
  return Cookie.remove(TokenKey)
}






























const address = 'https://rushi.net:';
const localhost = 'http://localhost:'
const port = process.env.NODE_ENV === 'production' ? address+'80/' : localhost+'3000/'
const auth = {
	secret: 'fanxiansheng',//密钥
    tokenKey: 'Token-Auth',//token名称
    port:port//判断是本地开发环境还是生产环境
}

module.exports = auth



































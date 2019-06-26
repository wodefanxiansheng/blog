var mongoose = require('mongoose');//Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
var Schema = mongoose.Schema;//定义表模型

var userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    avatar: String,
    roles: Array,
    createTime: { type: Date, default: Date.now},
    loginTime: Date
})
module.exports = mongoose.model('users',userSchema,'users')





















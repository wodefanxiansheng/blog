var mongoose = require('mongoose');//Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
var Schema = mongoose.Schema;//定义表模型

var produtSchema = new Schema({
    "_id" : String, 
    "id":String,
    "logoheader" : String, 
    "kongjianTime" : String, 
    "kongjianName" : String, 
    "liulanNum" : String, 
    "zanNum" : String, 
    "shuoshuo" : String,
    "checked":Boolean,
})
module.exports = mongoose.model('shuoshuos',produtSchema,'shuoshuos')





















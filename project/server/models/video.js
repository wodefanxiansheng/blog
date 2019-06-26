var mongoose = require('mongoose');//Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
var Schema = mongoose.Schema;//定义表模型

var produtSchema = new Schema({
	url:String,
	cover:String,
	name:String,
	classify:String,
	type:String,
	tags:Array,
	desc:String,
    createTime: { type: Date, default: Date.now}
})
module.exports = mongoose.model('video',produtSchema,'videos')





















var mongoose = require('mongoose');//Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
var Schema = mongoose.Schema;//定义表模型

var produtSchema = new Schema({
	"title":String,
	"list":[
		{
			"src":String,
			"name":String,
			"content":String,
			"link":String
		}
	]
})
module.exports = mongoose.model('navs',produtSchema,'navs')





















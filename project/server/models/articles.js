var mongoose = require('mongoose');//Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
var Schema = mongoose.Schema;//定义表模型

// var produtSchema = new Schema({
//     "articleContent":String,
// 	"articleSrc": String,
// 	"articleTitle": String,
// 	"ctime": String,
// 	"fenleiId": String,
// 	"likeNum":Number,
// 	"liulanNum": Number,
// 	"type": String,
// 	"_id": String,
// 	"pageId":String
// })
var produtSchema = new Schema({
    type: Array,//名字
	title:String,//用户登录名
	impNuber: Number,//重要性
	time: Date,//发布的时间
	html:String,//后台转义回来的内容
	contentEditor:String,//富文本内容
	contentMark:String,//markdown内容
	src:String,//封面图
    createTime: { type: Date, default: Date.now}
})
module.exports = mongoose.model('articles',produtSchema,'articles')





















var mongoose = require('mongoose');//Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具。
var Schema = mongoose.Schema;//定义表模型

var produtSchema = new Schema({
	"content" : String, 
    "src" : String, 
    "senderName" : String, 
    "time" : String, 
    "articleId" : String, 
    "r_reply_list" : [
        {
            "content" : String, 
            "senderName" : String,
            "time" : String,
            "articleId" : String,
            "src" : String, 
            "recipient":String
        }
    ],

})
module.exports = mongoose.model('comments',produtSchema,'comments')





















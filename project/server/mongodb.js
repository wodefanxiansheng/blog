let mongoose = require('mongoose');
//数据库连接
mongoose.connect('mongodb://127.0.0.1:27017/bokeone');
mongoose.connection.on("connected",function (req,res) {
  console.log("数据库连接成功")
});
mongoose.connection.on("error",function () {
    console.log("数据库连接失败")
});
mongoose.connection.on("disconnected",function () {
    console.log("数据库断开连接")
});
module.exports = mongoose;


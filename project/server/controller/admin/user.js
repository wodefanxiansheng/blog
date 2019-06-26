let express = require('express');
let router = express.Router();

let mongoose = require('./mongodb');

//token身份验证方法
let config = require('./config');
let jwt = require('jsonwebtoken');

// 模型
var Users = require('./models/user');


// login登录接口
router.post('/login',function (req,res) {
   let username = req.body.username,
       password = req.body.password;
    console.log(username,password)
    Users.findOne({'username':username},(err,docs) =>{
        if(err){
          res.send(err);
          return;
        }
        // 判断用户密码
        if(password !== docs.password){
              res.send({
                  status:'402',
                  msg:'密码错误',
              })
              return;
        }
        // 判断用户账号
        if(!docs){
           res.send({
            'status':'401',
            'msg':'登录失败,用户不存在'
           });
        }
        const payload = {
             _id:docs._id,
             username:docs.username,
             name:docs.name,
             roles:docs.roles
        }
        // 设置存储token密匙
        let token = jwt.sign(payload,config.secret,{expiresIn:'24h'});
        res.cookie(config.tokenKey,token,{
            httpOnly: false,
            maxAge: 24*60*60*1000,
        })
        res.send({
              status:'200',
              msg:'恭喜你,登陆成功',
        })
    })   
})

module.exports = router















































let express = require('express');
let router = express.Router();

//token身份验证方法
let config = require('../config');
let jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('logins');
});

// 模型
let Users = require('../models/user');
// login登录接口
router.post('/login',function (req,res) {
   let username = req.body.username,
       password = req.body.password;
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

// 获取用户信息
router.post('/info',function (req,res,next) {
      let token = req.body.token;
      jwt.verify(token,config.secret,function(err,decode){
        // console.log(err,decode)
          if(err){
             //失效的token
             // throw err;
             console.log("token失效")
             res.send({
                 'status':10000,
                 'msg':"token失效"
             })
          }else{
            // 验证成功
             res.send({
                 'status':1,
                 'msg':"token验证成功",
                  'data':{
                        username: decode.username,
                        name: decode.name,
                        _id: decode._id,
                        roles: decode.roles
                  }
             })
          }
      });
})

// 添加管理员
router.post('/addUser',function (req,res,next) {
  let name = req.body.name,
      username = req.body.username,
      password = req.body.password,
      roles = req.body.resource;
      // console.log(name,username,password,roles)
  Users.findOne({'username':username},(err,docs) =>{
      if(docs){
          res.send({
               'status':10001,
               'msg':"用户名已经存在"
          })
      }else{
            let updateStr={
                "name":name,
                "username":username,
                "password":password,
                "roles":roles,
            }
            Users.create(updateStr, function(err, data) {
                  if (err) {
                    res.json({
                        status:'1',
                        msg:'',
                        result:"添加管理员失败"
                    })
                  } else {
                     res.json({
                        status:'0',
                        msg:'',
                        result:"添加管理员成功"
                    })
                  }
           })
      }
  });
  
})
// 用户列表
router.get('/adminUserLists',function (req,res,next) {
  let page = parseInt(req.param("page")),
      pageSize = parseInt(req.param("pageSize")),
      keyword = req.param('keyword'),
      skip = (page - 1)*pageSize,
      params = {},
      UsersModel = Users.find(params).skip(skip).limit(pageSize),
      UsersModels = UsersModel.sort('createTime'),
      totalCount;
  let reg= new RegExp(keyword, 'i');//模糊查询参数
      Users.count({$or:[
            {'name':reg},
            {'username':reg}
        ]
      }, function (err, count) {
             totalCount = count;
      });

      UsersModels.find({
        $or:[
            {'name':reg},
            {'username':reg}
        ]
      },(err,doc) =>{
          if(err){
              res.json({
                  status:'1',
                  msg:err.message
              })
          }else{
              res.json({
                  status:'0',
                  msg:'success',
                  totalCount:totalCount,
                  result:doc

              })
          }
      })
})
// 更新用户信息
router.post('/editUser',function (req,res,next) {
  let name = req.body.name,
      username = req.body.username,
      password = req.body.password,
      roles = req.body.roles,
      _id = req.body._id;
  let updateStr={
      "name":name,
      "username":username,
      "password":password,
      "roles":roles,
  }
  Users.update({"_id":_id},updateStr,function (err,doc) {
    if(err){
        res.json({
            status:"1",
            msg:err.message,
            result:''
        })
    }else{
        if(doc){
            res.json({
                status:"0",
                msg:"",
                result:"更新用户信息成功"
            })
        }
    }
  })
})

// 删除管理员
router.post('/deleteUser',(req,res) =>{
    let _id = req.body._id;
    Users.remove({'_id':_id},(err,doc) =>{
      if(err){
        res.json({
            status:"1",
            msg:err.message,
            result:''
        })
      }else{
        res.json({
           status:"0",
            msg:"",
            result:"删除成功"
        })
      }
    })
})
















module.exports = router






























































































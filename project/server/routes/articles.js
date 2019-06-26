let express = require('express');
let router = express.Router();
let mongoose = require('../mongodb');

//token身份验证方法
// let config = require('../config');
// let jwt = require('jsonwebtoken');

//引入模型
let Articles = require('../models/articles');
let messages = require('../models/messages');
let Comments = require('../models/comments');
let webdetails = require('../models/webdetails');
let zanIps = require('../models/zanIps');


// 获取ip地址
var ips = require('../models/ips');//获取user模型
router.get('/getIp', function(req, res,nest){
  // 获取ip地址
  function getClientIp(req) {
      return req.ip
  }
  let ip = getClientIp(req);
  let ipBol = false;
    // 再次查询
    ips.find({},function (err,doc) {
        doc.forEach(item => {
          if(item.ip == ip){
            ipBol = true;
          }
        })
        if(ipBol) {
          res.json({
                  status:"0",
                  msg:'',
                  result:doc.length
              })
          return;
        }else{
          ips.create({"ip":ip},function (err,doc) {
          
        })
          res.json({
                  status:"0",
                  msg:'',
                  result:doc.length
              })
        }
      
      
    })

});
//查询技术文章列表
router.get("/",function (req,res,next) {
   let page = parseInt(req.param("page"));
   let pageSize = parseInt(req.param("pageSize"));
   let fenleiId = req.param("fenleiId");
   let skip = (page - 1)*pageSize;
   let params = {};
   let ArticlesModel = Articles.find(params).skip(skip).limit(pageSize);
   let ArticlesModels = ArticlesModel.sort({'ctime':-1})//排序
   let totalCount;
   console.log(page,pageSize)
    if(fenleiId == '0'){
       Articles.find({}).count({}, function (err, count) {
         totalCount = count;
         console.log(count)
       });
        ArticlesModels.find({},function (err,doc) {
           if(err){
                res.json({
                    status:'1',
                    msg:err.message
                })
            }else{
                res.json({
                    status:'0',
                    msg:'',
                    totalCount:totalCount,
                    result:{
                        count:doc.length,
                        list:doc
                    }

                })
            }
        })
    }else{
       Articles.find({"fenleiId":fenleiId}).count({}, function (err, count) {
         totalCount = count;
         console.log(count)
       });
        ArticlesModels.find({"fenleiId":fenleiId},function (err,doc) {
           if(err){
                res.json({
                    status:'1',
                    msg:err.message
                })
            }else{
                res.json({
                    status:'0',
                    msg:'',
                    totalCount:totalCount,
                    result:{
                        count:doc.length,
                        list:doc
                    }

                })
            }
        })
    }
   
});


router.get("/dianjinum",function (req,res,next) {
   let page = parseInt(req.param("page"));
   let pageSize = parseInt(req.param("pageSize"));
   let skip = (page - 1)*pageSize;
   let params = {};
   let ArticlesModel = Articles.find(params).skip(skip).limit(pageSize);
   let ArticlesModels = ArticlesModel.sort({"liulanNum":-1});//排序
   ArticlesModels.exec(function (err,doc) {
           if(err){
                res.json({
                    status:'1',
                    msg:err.message
                })
            }else{
                res.json({
                    status:'0',
                    msg:'',
                    result:{
                        count:doc.length,
                        list:doc
                    }

                })
            }
    })
  
   
});



// 点击技术文章列表，打开详情
router.get("/webdetails",function (req,res,next) {
   let pageId = req.param("pageId");
   webdetails.findOne({"pageId":pageId},function (err,doc) {
          if(doc){
                    // var liulanNum = parseInt(doc.liulanNum);
                    // liulanNum ++;
                    doc.save(function (err2,doc2) {
                          if(err2){
                              res.json({
                                  status:'1',
                                  msg:err2.message
                              })
                          }else{
                              res.json({
                                  status:'0',
                                  msg:'',
                                  result:doc
                              })
                          } 
                    })
          }
    })
});

// 计算文章浏览量
router.post("/liulanCount",function (req,res,next) { 
    let liulanNum = req.body.liulanNum,
        pageId = req.body.pageId;
    // console.log(pageId)
    let updateStr = {
      "liulanNum":liulanNum
    }
    Articles.update({"pageId":pageId},updateStr,function (err,doc) {
      console.log(pageId)
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
                        result:"文章浏览量"
                    })
                }
            }
    })
})
router.post("/detailCount",function (req,res,next) { 
    let liulanNum = req.body.liulanNum,
        pageId = req.body.pageId;
    webdetails.update({"pageId":pageId},{$set: {"liulanNum":liulanNum}},function (err,doc) {
        if(doc){
            if(err){
                res.json({
                    status:"1",
                    msg:err.message
                })
            }else{
                res.json({
                    status:"0",
                    msg:'',
                    result:'success'
                })
            }
        }
    })
})




// 分类
router.get("/fenleis",function (req,res,next) {
   var fenleis = require('../models/fenleis');//引入模型
   let params = {};
   let fenleisModel = fenleis.find(params);
   fenleisModel.sort({'fenleiId':0})
   fenleisModel.find({},function (err,doc) {
       if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }

            })
        }
    })
});


// 说说
router.get("/shuoshuos",function (req,res,next) {
   var Articles = require('../models/shuoshuos');//引入模型

   let page = parseInt(req.param("page"));
   let pageSize = parseInt(req.param("pageSize"));
   let skip = (page - 1)*pageSize;
   let params = {};
   let ArticlesModel = Articles.find(params).skip(skip).limit(pageSize);
   let ArticlesModels = ArticlesModel.sort({'kongjianTime':-1})//排序
   let totalCount;
    Articles.count({}, function (err, count) {
      console.log(count)
      totalCount = count;
    });
   ArticlesModels.find({},function (err,doc) {
       if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                totalCount:totalCount,
                result:{
                    count:doc.length,
                    list:doc
                }

            })
        }
    })
});

// 点赞
router.post("/dianzan",function (req,res,next) { 
   var Shuoshuos = require('../models/shuoshuos');//引入模型
    let number = req.body.number,
        checked = req.body.checked,
        shuoshuoId = req.body.shuoshuoId;
    let updateStr={
        "zanNum":number,
         "checked":checked,

    }
        Shuoshuos.update({"id":shuoshuoId},updateStr,function (err,doc) {
          console.log(doc)
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
                        result:"数据更新成功"
                    })
                }
            }
        })    
  
})

//文章详情评论
router.get("/comments",function (req,res,next) {
   let articleId = req.param("articleId");//文章id
   let page = parseInt(req.param("page"));//页码
   let pageSize = parseInt(req.param("pageSize"));//条数
   let skip = (page - 1)*pageSize;
   let params = {};
   let CommentsModel = Comments.find(params).skip(skip).limit(pageSize);
   let CommentsModels = CommentsModel.sort({'time':-1})//排序
   let totalCount;
    Comments.find({"articleId":articleId}).count({}, function (err, count) {
         totalCount = count;
         // console.log(count)
    });
   CommentsModels.find({"articleId":articleId},function (err,doc) {
          // console.log(doc,page,pageSize,articleId)
          if(doc){
             res.json({
                    status:'0',
                    msg:'',
                    result:doc,
                    totalCount:totalCount

              })
          }
    })
});


// 留言墙
router.get("/messages",function (req,res,next) {
   

   let page = parseInt(req.param("page"));//页码
   let pageSize = parseInt(req.param("pageSize"));//条数
   let skip = (page - 1)*pageSize;
   let params = {};
   let messagesModel = messages.find(params).skip(skip).limit(pageSize);
   let messagesModels = messagesModel.sort({'time':-1})//排序
   let totalCount;
    messages.find({}).count({}, function (err, count) {
         totalCount = count;
         // console.log(count)
    });
   messagesModels.find({},function (err,doc) {
       if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                totalCount:totalCount,
                result:{
                    count:doc.length,
                    list:doc
                }

            })
        }
    })
});


// 留言板，添加留言
router.post("/messagesubmit",function (req,res,next) { 
   
    let city = req.body.city,
        content = req.body.content,
        name = req.body.name,
        time = req.body.time,
        src = req.body.src;

    let updateStr={
        "city":city,
        "content":content,
        "name":name,
        "time":time,
        "src":src
    }
    messages.create(updateStr, function(err, data) {
          if (err) {
            res.json({
                status:'1',
                msg:'',
                result:"失败"

            })
          } else {
             res.json({
                status:'0',
                msg:'',
                result:"ok"

            })
          }
   })
})

// nvagation
router.get("/navs",function (req,res,next) {
   let navs = require('../models/navs');
   navs.find({},function (err,doc) {
          if(doc){
              if(err){
                  res.json({
                    status:'1',
                    msg:'',
                    result:"失败"

                  })
              }else{
                  res.json({
                        status:'0',
                        msg:'',
                        result:doc,
                  })
              }
          }
    })
});

// 文章评论，回复
router.post("/reply",function (req,res,next) {
    let nowId = req.body.nowId,
        senderName = req.body.senderName,
        recipientName = req.body.recipientName,
        articleId = req.body.articleId,
        time = req.body.time,
        content = req.body.content,
        src = req.body.src,
        _id = req.body._id;
    // console.log(time,src)
    let updateStr = {
      "content" : content, 
      "src" : src, 
      "senderName" : senderName, 
      "time" : time, 
      "articleId" : articleId, 
    }
    let updateStr2 = {
        "content" : content, 
        "src" : src, 
        "senderName" : senderName, 
        "time" : time,
        "recipient" :recipientName,
        "articleId" : articleId, 
      }
    if(nowId == 1){
        Comments.create(updateStr, function(err, data) {
                if (err) {
                  res.json({
                      status:'1',
                      msg:'',
                      result:"失败"

                  })
                } else {
                   res.json({
                      status:'0',
                      msg:'',
                      result:"ok"

                  })
                }
         })
    }else{
        Comments.findByIdAndUpdate({"_id":_id},{
            $push:{
              r_reply_list:updateStr2
            }
        },function (err1) {
             if(err1){
                  res.json({
                      status:"1",
                      msg:err1.message
                  })
              }else{

                  res.json({
                      status:"0",
                      msg:'',
                      result:'success'
                  })
                          

                  
              }
        })
    }
    
});
// 点赞
router.post("/detailDianzan",function (req,res,next) { 
  // 获取ip地址
  function getClientIp(req) {
      return req.ip
  }
  let ip = getClientIp(req);
  let ipBol = false;

  let  pageId = req.body.pageId,
       likeNum = parseInt(req.body.likeNum),
       type = req.body.type;
  let updateStr={
      "type":type,
      "likeNum":likeNum
  }
  zanIps.find({'ip':ip},function (err,doc) {
        doc.forEach(item => {
          if(item.ip == ip){
             ipBol = true;
          }
        })
        if(ipBol) {
                res.json({
                        status:"0",
                        msg:'',
                        result:'您已经点赞过了'
                    })
                return;
        }else{
               zanIps.create({"ip":ip},function (err,doc) {
              
               })
               webdetails.update({"pageId":pageId},updateStr,function (err,doc) {
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
                                code:"0",
                                msg:"",
                                result:"点赞成功"
                            })
                        }
                    }
              })    
        }
      
      
  })
    
})


module.exports = router;

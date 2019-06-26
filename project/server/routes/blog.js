let express = require('express');
let router = express.Router();
let mongoose = require('../mongodb');
let config = require('../config.js')
// let marked = require('marked');
let multer = require("multer");//Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。它是写在 busboy 之上非常高效。
let path = require('path');
let messages = require('../models/messages');
let Articles = require('../models/articles');
let fenleis = require('../models/fenleis');
let Videos = require('../models/video');

// router.get('/', function(req, res, next) {
//   res.send('blogs');
// });


router.post('/addBlog', function(req, res,nest){
	let addBlogContent =  req.body;
	Articles.findOne({'title':req.body.title},(err,docs) =>{
      if(docs){
	          res.send({
	               'status':10001,
	               'msg':"此文章已经存在,请修改标题名",
                 'result':{
                    code:10001,
                 }
	          })
      }else{
	        Articles.create(addBlogContent, function(err, data) {
	              if (err) {
	                res.json({
	                    status:'1',
	                    msg:'',
	                    result:"添加博客失败"
	                })
	              } else {
	                 res.json({
	                    status:'0',
	                    msg:'添加博客成功',
	                    result:data
	                })
	              }
	       })
      }
  });	
})
// markdown图片上传
var storage = multer.diskStorage({	
    // 文件保存路径
  	destination: function (req, file, cb) {
	    cb(null, path.join(__dirname,'../../../public/serverImages'))
  	},
  	// 修改文件名称
  	filename: function (req, file, cb) {
	  	var str = file.originalname.split('.');
	    cb(null, Date.now()+'.'+str[1]);
  	}
})
var upload = multer({ storage: storage });//

router.post('/uploadImages',upload.array("images",20), function(req, res,nest){
    console.log(req)
    var imageArr = [];
    // 截取需要的字符串
    for (var i in req.files) {
    	imageArr.push(req.files[i].path)
    }
    var imageArrStr = imageArr.join('\\').split('\\');
    var currentIndex = imageArrStr.indexOf('serverImages');
    var str = imageArrStr.slice(currentIndex,imageArrStr.length).join('/');
    var serverImageUrl = config.port + str
    res.json({
    	code:200,
    	data:serverImageUrl,
    	msg:'上传图片成功'
    })
})

// markdown图片上传
var storage_cover = multer.diskStorage({  
    // 文件保存路径
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../../public/serverImages'))
    },
    // 修改文件名称
    filename: function (req, file, cb) {
      var str = file.originalname.split('.');
      cb(null, Date.now()+'.'+str[1]);
    }
})
var upload_cover = multer({ storage: storage_cover });//

router.post('/uploadCover',upload_cover.single("file",1), function(req, res,nest){
    var cover = req.file.path,
         coverImage = cover.split('\\'),
         coverCurrent = coverImage.indexOf('serverImages'),
         str = coverImage.slice(coverCurrent,coverImage.length).join('/'),
         src = config.port + str;
         console.log(config.port,'&&&&',str)
          // 返回值
          res.json({
            code:200,
            data:src,
            msg:'上传封面成功'
          })
})




// 视频上传
var storage_video = multer.diskStorage({  
    // 文件保存路径
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../../public/video'))
    },
    // 修改文件名称
    filename: function (req, file, cb) {
      var str = file.originalname.split('.');
      cb(null, Date.now()+'.'+str[1]);
    }
})
var upload_video = multer({ storage: storage_video });//
router.post('/uploadVideo',upload_video.single("file",1), function(req, res,nest){
    var videoUrl = req.file.path,
         videoUrl2 = videoUrl.split('\\'),
         videoCurrent = videoUrl2.indexOf('video'),
         str = videoUrl2.slice(videoCurrent,videoUrl2.length).join('/'),
         videoSrc = config.port + str;
          // 返回值
          res.json({
            code:200,
            data:videoSrc,
            msg:'上传视频成功'
          })
})

// 视频信息上传
router.post('/videoInfo',function (req, res,) {
    let getVideoInfo = req.body;
    console.log(getVideoInfo)
    Videos.findOne({'name':req.body.name},(err,docs) =>{
      if(docs){
            res.send({
                 'status':'10001',
                 'msg':"此视频已经存在,请修改视频名称",
                 'result':{
                    code:10001,
                 }
            })
      }else{
          Videos.create(getVideoInfo, function(err, data) {
                if (err) {
                  res.json({
                      status:'1',
                      msg:'',
                      result:"添加视频失败"
                  })
                } else {
                   res.json({
                      status:'0',
                      msg:'添加视频成功',
                      result:data
                  })
                }
         })
      }
  }); 

})
// 视频列表
router.get("/videolists",function (req,res,next) {
   let page = parseInt(req.param("page"));
   let pageSize = parseInt(req.param("pageSize"));

   let skip = (page - 1)*pageSize;
   let params = {};
   let VideosModel = Videos.find(params).skip(skip).limit(pageSize);
   let VideosModels = VideosModel.sort({'createTime':-1})//排序
   let totalCount;

   Videos.find().count({}, function (err, count) {
     totalCount = count;
   });
    VideosModels.find(function (err,doc,count) {
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
// 删除video视频（单个）
router.post("/deleteVideo",function (req,res,next) {
    let _id = req.body._id;
    Videos.remove({'_id':_id},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                  msg:err
                }
            })
        }else{
            res.json({
                status:"0",
                msg:"",
                result:"删除成功"
            })
        }
    })
});
// 删除多个视频
router.post("/deleleAllVideo",function (req,res,next) {
    let videoAllId = req.body.videoAllId;
    console.log(videoAllId)
    Videos.remove({'_id':{$in:videoAllId}},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                  msg:err
                }
            })
        }else{
            res.json({
                status:"0",
                msg:"",
                result:"删除成功"
            })
        }
    })
});
// 视频详情
router.post("/videoDetail",function (req,res,next) {
    let _id = req.body._id;
    Videos.findOne({_id:_id},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc
            })
        }
    })
})


// 编剧视频
router.post('/videoUpdate',function (req,res,next) {
    let updateStr={
        "url":req.body.url,
        "name":req.body.name,
        "classify":req.body.classify,
        "type":req.body.type,
        "tags":req.body.tags,
        "desc":req.body.desc,
        "cover":req.body.cover,
    };
    let _id = req.body._id;
    Videos.update({"_id":_id},updateStr,function (err,doc) {
      if(err){
          res.json({
              status:"1",
              msg:err.message,
              result:'更新失败'
          })
      }else{
          if(doc){
              res.json({
                  status:"0",
                  msg:"",
                  result:"视频更新成功"
              })
          }
      }
    })
})




//查询技术文章列表
router.get("/blogLists",function (req,res,next) {
   let page = parseInt(req.param("page"));
   let pageSize = parseInt(req.param("pageSize"));

   let skip = (page - 1)*pageSize;
   let params = {};
   let ArticlesModel = Articles.find(params).skip(skip).limit(pageSize);
   let ArticlesModels = ArticlesModel.sort({'createTime':-1})//排序
   let totalCount;

   Articles.find().count({}, function (err, count) {
     totalCount = count;
   });
    ArticlesModels.find(function (err,doc,count) {
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
// 作品详情
router.post("/blogDetail",function (req,res,next) {
    let _id = req.body._id;
    Articles.findOne({_id:_id},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc
            })
        }
    })
})

// 删除博客
router.post("/deleteBlog",function (req,res,next) {
    let _id = req.body._id;
    Articles.remove({'_id':_id},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                  msg:err
                }
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

// 编辑博客

// 更新用户信息
router.post('/update',function (req,res,next) {
    let updateStr={
        "type":req.body.type,
        "title":req.body.title,
        "impNuber":req.body.impNuber,
        "time":req.body.time,
        "html":req.body.html,
        "contentEditor":req.body.contentEditor,
        "contentMark":req.body.contentMark,
        "src":req.body.src,
    };
    let _id = req.body._id;
    Articles.update({"_id":_id},updateStr,function (err,doc) {
      console.log(doc)
      if(err){
          res.json({
              status:"1",
              msg:err.message,
              result:'更新失败'
          })
      }else{
          if(doc){
              res.json({
                  status:"0",
                  msg:"",
                  result:"博客文章更新成功"
              })
          }
      }
    })
})


// 留言墙列表
router.get("/commentsList",function (req,res,next) {

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


// 删除留言
router.post("/deleteComment",function (req,res,next) {
    let _id = req.body._id;
    messages.remove({'_id':_id},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                  msg:err
                }
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

// 分类
router.post("/getClass",function (req,res,next) {
    fenleis.find({},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                  msg:err
                }
            })
        }else{
            res.json({
                status:"0",
                msg:"",
                result:doc
            })
        }
    })
})

// 更改是否为禁用
router.post('/updateType',function (req,res,next) {
    let whereStr = {_id:req.body._id};

    let updateStr={
        "type":req.body.type,
    };
    fenleis.update(whereStr,updateStr,function (err,doc) {
      console.log(doc)
      if(err){
          res.json({
              status:"1",
              msg:err.message,
              result:'更新失败'
          })
      }else{
          res.json({
              status:"0",
              msg:"修改成功",
              result:doc
          })
          
      }
    })
})
// 更改名字
router.post('/editClass',function (req,res,next) {
    let whereStr = {_id:req.body._id};
    let updateStr={
        "name":req.body.name,
    };
    fenleis.update(whereStr,updateStr,function (err,doc) {
      if(err){
          res.json({
              status:"1",
              msg:err.message,
              result:'更新失败'
          })
      }else{
          res.json({
              status:"0",
              msg:"修改成功",
              result:doc
          })
          
      }
    })
})
// 删除分类
router.post('/deleteClass',function (req,res,next) {
    let _id = req.body._id;
    console.log(_id)
    fenleis.remove({'_id':_id},(err,doc) =>{
      if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:{
                  msg:err
                }
            })
        }else{
            res.json({
                status:"0",
                msg:"",
                result:doc
            })
        }
    })
})

// 添加分类
router.post('/addFenlei', function(req, res,nest){
  let addfenleiContent =  req.body;
  fenleis.findOne({'name':req.body.name},(err,docs) =>{
      if(docs){
            res.send({
                 'status':10001,
                 'msg':"已存在",
                 'result':{
                    code:10001,
                 }
            })
      }else{
          fenleis.create(addfenleiContent, function(err, data) {
                if (err) {
                  res.json({
                      status:'1',
                      msg:'',
                      result:"添加分类失败"
                  })
                } else {
                   res.json({
                      status:'0',
                      msg:'添加分类成功',
                      result:data
                  })
                }
         })
      }
  }); 
})











module.exports = router



























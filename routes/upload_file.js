var express = require('express');
var router = express.Router();
// https://www.cnblogs.com/yuanke/p/5221853.html
var formidable = require('formidable'),
    util = require('util');

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});
    
// 上传图片
router.route('/uploadImg').post((req,res)=>{
  // parse a file upload
  var fs = require('fs')
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';                    
  form.uploadDir = "./public/images";                     // 文件存储地址
  form.keepExtensions = true;                         // 保留文件后缀
  form.maxFieldSize = 2*1024*1024;                      // 设置图片大小
  form.parse(req, function(err, fields, files) {      // 解析文件[files：文件信息]
    var newfilename =form.uploadDir + "/" + files.file.name; // 最终文件名 
    var oldFilename =files.file.path; 
    res.writeHead(200, {'content-type': 'text/plain'});  
    fs.rename(oldFilename,newfilename,function(err){
      if(err){
        console.error("改名失败"+err);
      }
     return  res.end(util.inspect({fields: fields, files: files}));
    });
    //return  res.end(util.inspect({fields: fields, files: files}));
    return '';
  });
  return;
})

// 上传文件[file,xlxs,txt]
router.route('./uploadFile').post((req,res) => {
  
})
module.exports = router;
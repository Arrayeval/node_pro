var express = require('express');
var router = express.Router();
// https://www.cnblogs.com/yuanke/p/5221853.html
var formidable = require('formidable'),
    util = require('util');

// 上传图片
router.route('/uploadImg').post((req,res)=>{
  // parse a file upload
  var form = new formidable.IncomingForm();
  form.uploadDir = "./upload/img";                  // 文件存储地址
  form.keepExtensions = true;                       // 保留文件后缀
  form.maxFieldSize = 2;                            // 设置图片大小
  form.parse(req, function(err, fields, files) {    // 解析文件[files：文件信息]
   // console.log("files",files);
    res.writeHead(200, {'content-type': 'text/plain'});
    return  res.end(util.inspect({fields: fields, files: files}));
  });
  return;
})

// 上传文件[file,xlxs,txt]
router.route('./uploadFile').post((req,res) => {
  
})
module.exports = router;
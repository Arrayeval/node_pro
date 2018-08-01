exports.allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
};


// 读取文件
exports.getFile =  function (url,filePath) {
  var fs = require('fs')
  var documentRoot = __dirname + filePath;
  var file = documentRoot + url;
  fs.readFile(file,function(err,data){
    return new Promise ((resolve,reject) => {
      if (err) {
        // res.writeHeader(404,{
        //   'content-type':'text/html;charset="utf-8"'
        // })
        // res.write("<h1>404</h1><p>你要找的数据不存在</p>")
        // res.end()
        reject(err)
      } else {
        // res.writeHeader(200,{
        //   'content-type':'text/html;charset-"utf-8"'
        // })
        // res.end(data)
        resolve(data);
      }
    })
  
  })
}

// 获取图片资源
exports.getImgFile = function (res,imgName,filePath) {
  // var parse = require('url').parse;
  var join = require("path").join
  var fs = require('fs')
  var http = require("http")
  // 路径解析
  var path = require('path')
  var _path = path.resolve(__dirname, '..')
  var root = _path + '/upload/img/'
  var imgPath = join(root,"imgName")
  //var server = http.createServer((req,res)=>{
      fs.stat(path,(err,stat)=>{
        console.log(path)
        if(err){
          if("ENOCNT" === err.code) {
            res.statusCode = 404;
            res.end("Not Found")
          } else {
            res.statusCode = 500;
            res.end("Internal Server Error")
          }
        } else {
          res.setHeader("Content-Length",stat.size);
          var stream = fs.createReadStream(imgPath);
          stream.pipe(res);
          stream.on("error",function(err){
            res.statusCode = 500;
            res.end("Internal Server Error")
          })
        }
      })
  //}).listen(5000)
} 
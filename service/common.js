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
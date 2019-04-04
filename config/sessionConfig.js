let session = require('express-session')
const sessionConfig = {
  rolling: true, // 在用户离开操作之后30min,会自动清除session
  secret : "absddfd "+ '',  //加密session
  cookie : {
    maxAge : 1000*60*1, // 设置过期时间 30min
    // path: '/',
    // secure: true
    // domain: 'localhost:3000'
  },
  resave : true,  // 强制保存session 默认为 true，建议设置成false
  saveUninitialized : false // 强制将未初始化的session存储 默认为true，建议设置成true
}

function SetSession (app) {
  app.use(session({...sessionConfig}));
}

module.exports = SetSession
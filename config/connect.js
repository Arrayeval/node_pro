var mysql = require('mysql')
var config = require('./baseConfig')
var connection = ''

var pool = mysql.createPool({
  host: config.localConnect.host,
  user: config.localConnect.user,
  password: config.localConnect.password,
  port: config.localConnect.port,
  database: config.localConnect.database,
  acquireTimeout: config.localConnect.acquireTimeout, // 连接超时时间
  connectionLimit: config.localConnect.connectionLimit, // 最大连接数
})

var dbOperate = {
  // 链接数据库
  connectDB() {
    connection = mysql.createConnection({
      host: config.localConnect.host,
      port: config.localConnect.port,
      user: config.localConnect.user,
      password: config.localConnect.password,
      database: config.localConnect.database
    })
    connection.connect();
    return connection;
  },
  
  // 执行语句(单次链接)
  queryDataOne (sql,params) {
    this.connectDB()
    return new Promise((resolve, reject) => {
      connection.query(sql,params,function(err,results){
        if (err) {
          console.log("err",err)
          return reject(err)
        }
        return resolve(results)
      }) 
      // return resolve({code:1,msg:''})
     this.closeDB()
    })
  },
  closeDB() {
    connection.end()
  },

  // 连接池链接
  queryData (sql, para) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
          if (err) {
              return reject(err)
          }
          if (para) {
              conn.query(sql, para, (err, rows) => {
                  conn.release();
                  if (err) {
                      return reject(err);
                  }
                  return resolve(rows);
              });
          } else {
              conn.query(sql, (err, rows) => {
                  conn.release();
                  if (err) {
                      return reject(err);
                  }
                  return resolve(rows);
              });
          }
      });
    });
  }
}
module.exports = dbOperate

 

var mysql = require('mysql')
var config = require('./baseConfig')
console.log(config);
var connection = ''
var dbOperate = {
  connectDB() {
    connection = mysql.createConnection({
      host: config.localConnect.host,
      port: config.localConnect.port,
      user: config.localConnect.user,
      password: config.localConnect.password,
      database: config.localConnect.database
    })
    connection.connect();
    console.log("connection__",connection);
    return connection;
  },
  queryData (sql,params) {
    this.connectDB()
    return new Promise((resolve, reject) => {
      connection.query(sql,params,function(err,results){
        if (err) {
          console.log("err", err)
          return reject(err)
        }
        return resolve(results)
      }) 
      // return resolve({code:1,msg:''})
     // this.closeDB()
    })
  },
  closeDB() {
    connection.end()
  }
}
module.exports = dbOperate

 

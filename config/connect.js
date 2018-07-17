var mysql = require('mysql')
var config = require('./baseConfig')
var connection = ''
var dbOperate = {
  connectDB() {
    connection = mysql.createConnection({
      host: config.localConnect.host,
      user: config.localConnect.user,
      password: config.localConnect.password,
      port: config.localConnect.port,
      database: config.localConnect.database
    })
    connection.connect();
    return connection;
  },
  queryData (sql,params) {
    this.connectDB()
    return new Promise((resolve, reject) => {
      connection.query(sql,params,function(err,results){
        if (err) {
          return reject(err)
        }
        return resolve(results)
      }) 
      this.closeDB()
    })
  },
  closeDB() {
    connection.end()
  }
}
module.exports = dbOperate

 

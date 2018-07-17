var dbOperate = require('../config/connect')
var con = ''
var data = ''
const Tabs = {
  getTabs () {
    var sql = `select * from list`
    return dbOperate.queryData(sql,'').then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },
  // add tabs
  addTabs (data) {
    var sql = `insert into list set ?`
    return dbOperate.queryData(sql,data).then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },
}
module.exports = Tabs;
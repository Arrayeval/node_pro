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
  // add(edit) tabs 
  addTabs (data) {
    var sql = `insert into list set ?`
    // 文件处理
    if (data.fileData && data.fileData.length > 0) {
      data.logo_info = JSON.stringify(data.fileData[0])
      delete data.fileData
    }
    if (data.id != undefined) {
      sql = `update list set item_id =? , lag_title= ?, short_des = ?, time_date = ?, author_name = ? where id = ${data.id}`
      delete data.id
      data = Object.values(data)
    }
    return dbOperate.queryData(sql,data).then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },
}
module.exports = Tabs;
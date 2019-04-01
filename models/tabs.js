var dbOperate = require('../config/connect')
var envConfig = require('../config/envConfig')
const Tabs = {
  // 获得tabsList
  getTabs () {
    var sql = `select * from list`
    return dbOperate.queryData(sql,'').then(function(res){
      res.forEach((item , key) => {
        if (item.file_data !== '') {
          item.file_data = JSON.parse(item.file_data)
          item.file_data.url = envConfig.address() + '/images/' + item.file_data['name']
        }
      });
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },

  // add(edit) tabs 
  addTabs (data) {
    var sql = `insert into list set ?`
    // 文件处理
    if (data.file_data && data.file_data.length > 0) {
      data.file_data = JSON.stringify(data.file_data[0])
      // delete data.file_data
    } else {
      data.file_data = ''
    }
    if (data.item_id != undefined) {
      sql = `update list set  lag_title= ?, short_des = ?, author_name = ?, time_date = ? ,file_data = ? where item_id = ${data.item_id}`
      // sql = `update article_list set title = ? , content= ?, type = ?, author = ?, createTime = ?, file_data = ? where id = ${data.id}`
      delete data.item_id
      data = Object.values(data)
    }
    return dbOperate.queryData(sql,data).then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },

  // getTabInfo
  getTabInfo (data) {
    if (data.tabID != undefined) {
      var sql = `select * from list where item_id = ${data.tabID}`;
      return dbOperate.queryData(sql,'').then(function(res){
        res.forEach((item , key) => {
          if (item.file_data !== '') {
            item.file_data = JSON.parse(item.file_data)
            item.file_data.url = envConfig.address() +'/images/' + item.file_data['name']
          }
        });
        return Promise.resolve(res);
      }).catch(err => {return  Promise.reject(err)})
    }
  },
}
module.exports = Tabs;
var dbOperate = require('../config/connect')
var con = ''
var data = ''
const Article = {
  //  addArticle
  addArticle (data) {
    var sql = `insert into article_list set ?`
    return dbOperate.queryData(sql,data).then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  }
}
module.exports =  Article;
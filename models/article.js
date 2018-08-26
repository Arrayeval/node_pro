var dbOperate = require('../config/connect')
var con = ''
var data = ''
const Article = {
  // getArticleList
  getArticleList (data) {
    var sql = 'select * from article_list'
    if (data.type !== undefined && data.type !== null && data.type !== '') {
      sql= sql + ' where type = '+ `'${data.type}'`
    }
    return dbOperate.queryData(sql,'').then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },

  //  addArticle/updateArticle by id 
  addArticle (data) {
    var sql = `insert into article_list set ?`
    if (data.id != undefined ) { // 修改[拥有id说明是修改]
      sql = `update article_list set title = ? , shortDes = ?, content= ?, type = ?, author = ?, createTime = ?, logo_info = ? where id = ${data.id}`
      delete data.id
      data = Object.values(data)
    }  
    return dbOperate.queryData(sql,data).then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },

  // deleteArticle by id
  deleteArticle (data) {
    var sql = `delete from article_list where id = ${data.id}`;
    return dbOperate.queryData(sql,'').then((res)=>{
      return Promise.resolve(res)
    }).catch(err=>{
      return Promise.reject(err)
    })
  },

  // getArticleItem 
  getArticleItem (data) {
    var sql = `select * from article_list where id= ${data.id}`
    return dbOperate.queryData(sql,'').then((res)=>{
      return Promise.resolve(res)
    }).catch(err=>{
      return Promise.reject(err)
    })
  }
}
module.exports =  Article;
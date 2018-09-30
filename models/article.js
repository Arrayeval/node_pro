var dbOperate = require('../config/connect')
var con = ''
var data = ''
const pageCount = 15
const Article = {
  // getArticleList
  getArticleList (data) {
    if (data.pageNum === undefined) {
      data.pageNum = 0
    }
    var sql = `select * from article_list  limit ${data.pageNum * pageCount}, ${pageCount}`
    if (data.type !== undefined && data.type !== null && data.type !== '') {
      sql=  `select * from article_list where type = '${data.type}' limit ${data.pageNum * pageCount}, ${pageCount}`
    }
    return dbOperate.queryData(sql,'').then(function(res){
      return Promise.resolve(res)
    }).catch(err => {
      return Promise.reject(err)
    })
  },

  // 获取文章列表(时间[最近两天]，关键字)
  getSpecialArticleList (data) {
    let {keyWord} = {...data}
    var sql = `select * from article_list`
    if (keyWord === undefined || keyWord === '') { // 没进行关键字搜索(返回最近两天文章)
      let searchTime = new Date().getTime() / 1000 - 2 * 24 * 60 * 60 
      sql += ` where UNIX_TIMESTAMP(createTime) > ${searchTime} `
    } else { // 进行关键字搜索
      sql += ` where title like '%${data.keyWord}%' or author like '%${data.keyWord}%' or type like '%${data.keyWord}%'`
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
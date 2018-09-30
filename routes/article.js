var express = require('express')
var url = require('url')
var router = express.Router()
var Article = require('../models/article')

// addArticle [updateArticle]
router.route("/addArticle")
  .post((req,res)=>{
    Article.addArticle(req.body).then(result=>{
      return res.json({code: 0, msg: ''})
    }).catch(err=>{
      return res.json(err)
    })
  })
 
// getArticlceList
router.route('/getArticleList').get((req,res)=>{
 // var params = url.parse(req.url,true).query
 Article.getArticleList({type: req.query.type, pageNum: req.query.pageStart}).then(result => {
    return res.json({code: 0, msg: '',data:result})
  }).catch(err=>{
    return res.json(err)
  });

  /*
  let start_time = new Date().getTime()
  let pAll = []
  let count = 25000
  let getData =  Article.getArticleList({type: req.query.type, pageNum: req.query.pageStart});
  for (let i = 0; i < count; i++) {
    pAll.push(getData);
  }
  Promise.all(pAll).then(result => {
    let end_time = new Date().getTime();
    console.log(`response time: ${end_time - start_time}`);
    res.json({ code: 0, data: result });
  });
  */
})

// getSpecialArticleList
router.route('/getSpecialArticleList').get((req, res) => {
  Article.getSpecialArticleList({searchTime: req.query.searchTime , keyWord: req.query.keyWord}).then(result => {
    return res.json({code: 0, msg: '', data: result})
  }).catch(err => {
    console.log(err)
  })
})

// deleteArticle
router.route('/deleteArticle').get((req,res) => {
  Article.deleteArticle({id: req.query.id}).then(result => {
    return res.json({code: 0, msg: '',result: result})
  }).catch(err => {
    return res.json(err)
  })
})

// 获得文章详情
router.route('/getArticleItem').get((req, res) => {
  Article.getArticleItem({id:req.query.id}).then(result => {
    return res.json({code: 0, msg: '', result})
  }).catch(err => {
    return res.json(err)
  })
}) 
module.exports =  router;
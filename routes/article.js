var express = require('express')
var url = require('url')
var router = express.Router()
var Article = require('../models/article')
// addArticle [updateArticle]
router.route("/addArticle")
  .post((req,res)=>{
    Article.addArticle(req.body).then(result=>{
      res.json({code: 0, msg: ''})
    }).catch(err=>{
      res.json(err)
    })
  })
 
// getArticlceList
router.route('/getArticleList').get((req,res)=>{
  var params = url.parse(req.url,true).query
  Article.getArticleList({...params}).then(result => {
    res.json({code: 0, msg: '',data:result})
  }).catch(err=>{
    res.json(err)
  });
})

// deleteArticle
router.route('/deleteArticle:id?').get((req,res) => {
  // console.log(req.params);
  console.log(req.query);
  // console.log(req.body);
  res.json({code: 0, msg: ''})
})


module.exports =  router;
var express = require('express')
var router = express.Router()
var Article = require('../models/article')
// addArticle
router.route("/addArticle")
  .post((req,res)=>{
    Article.addArticle(req.body).then(result=>{
      res.json({code: 0, msg: ''})
    }).catch(err=>{
      res.json(err)
    })
  })
module.exports =  router;
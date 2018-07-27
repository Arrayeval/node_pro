var express = require('express')
var router = express.Router()
var Tab = require('../models/tabs')
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

// getTabslist
router.route('/')
  .get((req,res) => {
    Tab.getTabs().then(result => {
      return res.json(result)
    })
   // res.send('respond with a resource');
  })

// addTabs
router.route('/addTabs') 
  .post((req,res) => {
    Tab.addTabs(req.body).then(result => {
      return res.json({code: 0, msg: ''})
    }).catch((err) => {
      return res.json(err)
    })
   // res.send('respond with a resource');
  })

// getTaInfo获取模块信息
router.route('/getTabInfo:tabID')
  .get((req,res) => {
    Tab.getTabInfo({tabID:req.params.tabID}).then(res => {
      return res.json(res)
    })
  })
module.exports = router;
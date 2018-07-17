var express = require('express')
var router = express.Router()
var Tab = require('../models/tabs')
// getTabs
router.route('/')
  .get((req,res) => {
    Tab.getTabs().then(result => {
      res.json(result)
    })
   // res.send('respond with a resource');
  })
// 
router.route('/addTabs') 
  .post((req,res) => {
    Tab.addTabs(req.body).then(result => {
      res.json({code: 0, msg: ''})
    }).catch((err) => {
      res.json(err)
    })
   // res.send('respond with a resource');
  })

module.exports = router;
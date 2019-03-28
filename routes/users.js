
var express = require('express');
var router = express.Router();
var userSetting = require('../models/user_setting');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 用户登录
router.post('/login', (req, res, next) => {
  userSetting.login(req.body).then((result) => {
    req.session.userInfo = {
      username: result.username
    }
   return res.json({code: 0, msg: 'login success'})
  }).catch(err => {
    return res.json({code: -1, msg: err})
  })
})

// 用户登出
router.get('/loginOut', (req, res) => {
  userSetting.loginOut(req).then(result => {
    return res.json({code: 0, msg: 'login out success'})
  }).catch(err => {
    return res.json({code: -1, msg: err.message})
  })
  
})
module.exports = router;

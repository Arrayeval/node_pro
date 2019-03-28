var express = require('express')
var router = express.Router()
var getOuterData = require('../models/get_outer_data')

router.use((req, res, next) =>{
    if (req.session && req.session.userInfo && req.session.userInfo.username) {
        next()
        return '';
    } 
    res.json({code: -1, msg: 'not login'})
})

router.route("/getJueJinData")
.get((req, res) => {
    getOuterData.getJuejinData(req.query).then(result => {
        return res.json({code: 0, data: result})
    }).catch(err => {
        return res.json(err)
    })
})

module.exports =  router;
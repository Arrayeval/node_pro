var express = require('express')
var router = express.Router()
var getOuterData = require('../models/get_outer_data')

router.route("/getJueJinData")
    .get((req, res) => {
        getOuterData.getJuejinData(req.body).then(result => {
            return res.json({code: 0, data: result})
        }).catch(err => {
           return res.json(err)
        })
    })

    module.exports =  router;
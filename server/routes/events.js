var express = require('express');
var sql = require('mysql')
var bodyParser = require('body-parser')
var db = require('../db/conn')

var router = express.Router();


router.get('/getAllEvents', function(req, res, next) {
    sqlQeury = "select * from events"
    db.query(sqlQeury, function(err, rawData, fields) {
        if (err) throw err;
        var data = JSON.parse(JSON.stringify(rawData))
        console.log(data)
        res.json({
            status:200,
            response:"events fetched successfully",
            events:data     
        })
    })
});

router.get('/getEventById', function(req, res, next) {
    sql = "select * from events where event_id = " + req.query.event_id
    db.query(sql, [req.query.event_id], function(err, rawData, fields) {
        if (err) throw err;
        var data = JSON.parse(JSON.stringify(rawData))
        console.log(data)
        res.json({
            status:200,
            response:"event fetched successfully",
            event:data     
        })
        })
})

module.exports = router;
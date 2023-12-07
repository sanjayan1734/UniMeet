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

router.get('/deleteEventById', function(req, res, next) {

    sql = "delete from events where event_id = " + req.query.event_id
    db.query(sql, [req.query.event_id], function(err, rawData, fields) {
        if (err) throw err;
        var data = JSON.parse(JSON.stringify(rawData))
        console.log(data)
        res.json({
            status:200,
            response:"event deleted successfully",
            event:data     
        })
})
})

router.post('/registerEvent', function(req, res, next) {

    //need to check for duplicate registrations
    sql = "insert into registrations (event_id, user_id, event_name) values (" + req.query.event_id + "," + " \" " + req.query.user_id + "\" " + "," + "\"" + req.query.event_name + " \");"
    console.log(sql)
    db.query(sql, [req.query.event_id, req.query.user_id], function(err, rawData, fields) {
        if (err) throw err;
        var data = JSON.parse(JSON.stringify(rawData))
        console.log(data)
        res.json({
            status:200,
            response:"event registered successfully",
            event:data     
        })
})
})

router.get('/registeredEvents', function(req, res, next) {
    
        console.log(req.query.user_id)
        
        sql = "select * from registrations where user_id = \"" + req.query.user_id + "\";"
        console.log(sql)
        db.query(sql, [req.query.user_id], function(err, rawData, fields) {
            if (err) throw err;
            var data = JSON.parse(JSON.stringify(rawData))
            console.log(data)
            res.json({
                status:200,
                response:"events fetched successfully",
                events:data     
            })
    })
})

router.post('/addEvent', function(req, res, next) {

    //need to check for duplicate events
    sql = "insert into events (event_name, event_date, event_venue, event_description, chief guest) values (\"" + req.query.name + "\",\"" + req.query.date + "\",\"" + req.query.location + "\",\"" + req.query.description + "\",\"" + req.query.chief_guest + "\");"
    db.query(sql, [req.query.name, req.query.date, req.query.location, req.query.description, req.query.chief_guest], function(err, rawData, fields) {
        if (err) throw err;
        var data = JSON.parse(JSON.stringify(rawData))
        console.log(data)
        res.json({
            status:200,
            response:"event added successfully",
            event:data     
        })
})
})

router.get('/deleteEventById', function(req, res, next) {

    sql = "delete from events where event_id = " + req.query.event_id
    db.query(sql, [req.query.event_id], function(err, rawData, fields) {
        if (err) throw err;
        var data = JSON.parse(JSON.stringify(rawData))
        console.log(data)
        res.json({
            status:200,
            response:"event deleted successfully",
            event:data     
        })
    })
})

module.exports = router;
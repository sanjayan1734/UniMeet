var express = require('express');
var mysql = require('mysql')

var router = express.Router();
var db = require('../db/conn')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login/:userid/:password', function(req, res, next) {

  var userMailId = req.params.userid
  var userPassword = req.params.password
  
  sql = `select * from users where userid = "${userMailId}"`
  
  db.query(sql, function(err, rawData, fields) {
    if (err) throw err;
    var data = JSON.stringify(rawData)
    data = JSON.parse(data)
    console.log(data, data[0])
    if (userPassword == data[0]['password']){
      res.json({
        status:200,
        response:"authentication successful",
        userDetails:{
          userid:data[0]['userid'],
          firstname:data[0]['firstname'],
          lastname:data[0]['lastname']
        }
      })
    }
})
})

module.exports = router;

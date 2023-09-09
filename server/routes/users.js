var express = require('express');
var mysql = require('mysql')

var router = express.Router();
var db = require('../db/conn')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User management page!!');
});

// login route
router.get('/authenticate/:userid/:password', function(req, res, next) {

  var userMailId = req.params.userid
  var userPassword = req.params.password
  
  sqlQuery = `select * from users where userid = "${userMailId}"`
  
  db.query(sqlQuery, function(err, rawData, fields) {
    if (err) throw err;
    //preprocess data into string
    var data = JSON.stringify(rawData)
    data = JSON.parse(data)

    // check fo empty string and non existant username
    if (data.length == 0) {
      res.json({
        status:200,
        response:"invalid username or password",
        userDetails:{}
      })
    }
    // validate username and password
    else if (userPassword == data[0]['password']){
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
    // invalid password
    else {
      res.json({
        status:200,
        response:"invalid username or password",
        userDetails:{}
      })
    }
})




})

// registration route
router.post('/register', function(req, res) {
  var newUser = req.body
  
  sqlFetch = `SELECT USERID FROM USERS WHERE USERID = "${newUser['userid']}"`
  db.query(sqlFetch, function(err, rawData, fields) {
    if (err) throw err

    var data = JSON.stringify(rawData)
    data = JSON.parse(data)

    if (data.length == 1){
      res.json({
        status: 200,
        response: 'User already exists'
      })
    }

    else {
      sqlInsert = `INSERT INTO USERS VALUES ('${newUser['userid']}','${newUser['password']}', '${newUser['firstname']}', '${newUser['lastname']}' )`
      db.query(sqlInsert, function(err, rawData, fields){
        if (err) throw err

        var data = JSON.stringify(rawData)
        data = JSON.parse(data)

        console.log(data)
        res.json({
          status: 200,
          response:data
        })
      })
    }
  })

}) 

router.use('*',function (req, res) {
  res.redirect('/');
});

module.exports = router;

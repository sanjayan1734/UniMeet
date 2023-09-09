const mysql = require('mysql')
const uri = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "studentcorner"
}

var con = mysql.createConnection(uri)

con.connect( function(err) {
    if (err) console.log(err);
    else{
        console.log('successfully connected to database')
    }
})

module.exports = con
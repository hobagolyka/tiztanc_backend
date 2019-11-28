var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost:3306',
    user     : 'admin',
    password : 'admin',
    database : 'dancedb'
});

module.exports = connection;

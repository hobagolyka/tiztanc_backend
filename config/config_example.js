var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

module.exports = connection;

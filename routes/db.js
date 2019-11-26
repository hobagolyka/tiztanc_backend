// this files contains everything for databases
var addr = 'localhost:3306';

var mysql = require('mysql');

function test_db() {
    var con = mysql.createConnection({
        host: addr,
        user: 'admin',
        password: 'admin'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log('Connected!');
    });
}

test_db();
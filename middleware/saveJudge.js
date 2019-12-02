var mysql = require('mysql');
var connection = require('../config/config');

function dbconnect(callback, judgeName) {

    connection.query('INSERT INTO Judge SET judge_name = ' + mysql.escape(judgeName),
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {
    return function (req, res, next) {

        var data = req.body.values;
        var judgeName = data.name || "";

        dbconnect(function(err, results){
            if (err) {
                console.log(err);
            }
            else {
                res.judgeId = results.insertId;
                res.send('ok');
            }
            return next();
        }, judgeName);
    };
};

var mysql = require('mysql');
var connection = require('../config/config');

function getJudges(callback, judgeName) {

    connection.query('SELECT * FROM Judge',
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {
    return function (req, res, next) {
        getJudges(function(err, result){
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
            return next();
        });
    };
};

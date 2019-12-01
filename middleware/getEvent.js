var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {

    connection.query("SELECT * FROM dancedb.Event ORDER By Event.date DESC LIMIT 1", function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {

        dbconnect(req, function(err, result){
            if (err) throw err;
            else {
                console.log(result);
                res.send(result);
                return result;
            }
            return next();
        });
    };
};

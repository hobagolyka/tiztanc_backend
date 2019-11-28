var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type) {

    connection.query('SELECT * FROM food WHERE type = ' + mysql.escape(type), function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
    console.log("get data middleware")
        
        var type = req.param('type');

        dbconnect(req, function(err, result){
            if (err) throw err;
            else {

            }
            return next();
        }, type);
    };
};

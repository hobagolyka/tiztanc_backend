var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {

    connection.query('SELECT * FROM food WHERE name = ' + mysql.escape(data.name) + ', final = ' + mysql.escape(data.final), function(err,row){
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
    var data = res.body;

        dbconnect(req, function(err, result){
            if (err) throw err;
            else {

            }
            return next();
        }, type, data);
    };
};

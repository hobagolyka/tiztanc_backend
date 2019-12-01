var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {
    var heatQuery = 'SELECT * FROM '+ connection.config.database +'.Heat WHERE isActive = 1';
    connection.query(heatQuery, function(err,result){
        if (err) {throw err;}
        return callback(err, result);
    });
}

module.exports = function () {

    return function (req, res, next) {
        console.log("Get active heat...");
        var type = req.param('type');
        var bodyData = res.body;
        dbconnect(req, function(err, result){
            if (err) throw err;
            else {
                return result;
            }
            return next();
        }, type, bodyData);
    };
};
var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {
    var heatQuery = 'SELECT * FROM Heat WHERE isActive = 1';
    connection.query(heatQuery, function(err,result){
        if (err) {throw err;}
        return callback(err, result);
    });
}

module.exports = function () {

    return function (req, res, next) {

        var token = req.param('token');

        var bodyData = res.body;

        if(res.token === token)
            dbconnect(req, function(err, result){
                if (err) throw err;
                else {

                    res.send(result);
                    return next();
                }
                return next();
            }, bodyData);
        else
            return next();
    };
};
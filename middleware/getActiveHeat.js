var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(callback) {
    var heatQuery = 'SELECT * FROM Heat WHERE isActive = 1';
    connection.query(heatQuery, function(err,result){
        if (err) {throw err;}
        return callback(err, result);
    });
}

module.exports = function () {

    return function (req, res, next) {

        var token = req.param('token');

        if(res.token === token)
            dbconnect(function(err, result){
                if (err) throw err;
                else {
                    res.send(result);

                }
                return next();
            });
        else
            return next();
    };
};
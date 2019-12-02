var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {

    connection.query('SELECT * FROM dancedb.heat as heat INNER JOIN dancedb.pair as pair ON pair.idPair = heat.pairId', function(err,row){
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
                return next();
            }
            return next();
        });
    };
};

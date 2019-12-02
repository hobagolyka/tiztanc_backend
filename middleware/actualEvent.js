var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(callback) {

    connection.query('SELECT * FROM dancedb.Event as event INNER JOIN dancedb.heat as heat ON heat.eventId = event.idEvent INNER JOIN dancedb.pair as pair ON pair.idPair = heat.pairId WHERE event.isClosed = 0', function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {

        dbconnect(function(err, result){
            if (err) throw err;
            else {
                console.log(result);
                res.send(result);
            }
            return next();
        });
    };
};

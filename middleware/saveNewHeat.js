var mysql = require('mysql');
var connection = require('../config/config');

function insertNewHeat(callback, data, eventId, lastRoundInd) {
    var values = [];
    for(var i = 0; i<data.length; i++) {
        values.push([
                data[i][2], // danceType
                eventId, // eventId
                data[i][0], // pairId
                0, // isActive,
                lastRoundInd + 1, //roundIndex
        ]);
    }

    connection.query('INSERT INTO dancedb.heat (danceType, eventId, pairId, isActive, roundIndex) VALUES ?', [values],
        function(err,rows){
            return callback(err, rows);
        });
}

function dbconnect(callback, data, lastRoundInd) {
    var query = 'SELECT idEvent FROM dancedb.Event WHERE isClosed = 0';

    connection.query(query, (err, result) => {
        if(err){throw err;}
        else {
            insertNewHeat(callback, data, result[0].idEvent, lastRoundInd);
        }
    });
}

module.exports = function () {

    return function (req, res, next) {

        var lastRoundInd = req.params.roundIndex;
        var pairsReal = res.newHeat;

        dbconnect(function(err, results){
            if (err) {
                console.log(err);
            }
            else {
                console.log(results);
            }
            return next();
        }, pairsReal, lastRoundInd);
    };
};

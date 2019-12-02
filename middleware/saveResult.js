var mysql = require('mysql');
var connection = require('../config/config');

function dbconnect(callback, data, judgeId, eventId) {
    var resultQuery = 'INSERT INTO ' + connection.config.database +'.Results (round_id, pair_id, danceType, judgeId, eventId) VALUES ?';

    var values = [];
    var votes = [];

    Object.keys(data).forEach(function(item){
        if(item === 'name' || item === 'idEvent' || item === 'roundIndex' || item === 'danceType')
        {}
        else {
            votes.push(parseInt(item));
        }
    });

    votes.forEach( function(item) {
        values.push([mysql.escape(data.roundIndex), mysql.escape(item), mysql.escape(data.danceType), mysql.escape(judgeId), mysql.escape(eventId)]);
    });

    connection.query(resultQuery, [values],
        function(err,rows){
            if(err){throw err;}
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        var roundIndex = req.params,roundIndex;
        var judgeId = res.judgeId;
        var bodyData = req.body.values;
        var data = bodyData;
        var eventId = data.idEvent;

        dbconnect(function(err, result){
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
            return next();
        }, data, judgeId, eventId);

    };
};

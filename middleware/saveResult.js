var mysql = require('mysql');
var connection = require('../../config/config');
var path = require('path');
var fs = require('fs');

function dbconnect(callback, data, eventId, heatId) {
    var resultQuery = 'INSERT INTO ' + connection.config.database +'.Result (point, round_id, pair_id, danceType, judgeId, eventId) VALUES ';

    connection.query(resultQuery,
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        var data = req.body;
        var evenId = req.params.event_id;
        var heatId = req.params.heat_id;

        dbconnect(function(err, result){
            if (err) {res.msg = err;}
            else {
                res.msg = "ok";
                res.result = result;
            }
            return next();
        }, data, eventId, heatId);
    };
};

var mysql = require('mysql');
var connection = require('../config/config');
var path = require('path');
var fs = require('fs');

function dbconnect(callback, data, eventId) {
    var saveJudgeQuery = 'INSERT INTO ' + connection.config.database + '.Judge (judge_name) VALUES ?';

    connection.query(upupdateOldHeat, data,
        function(err,result){
            if(err){throw err;}
            else {
                console.log("Judges saved! Affected:" + result.affectedRows);
                result.ids = [];
                for (var idx = result.insertId; idx<(result.insertId + result.affectedRows); idx++) {
                    result.ids.push(idx);
                }
            }
            return callback(err, result);
        });
}

module.exports = function () {
    return function (req, res, next) {
        var data = req.body.judges;
        var eventId = req.params.eventId;

        dbconnect(function(err, results){
            if (err) {res.result = err;}
            else {res.result = results;}
            return next();
        }, data, eventId);
    };
};

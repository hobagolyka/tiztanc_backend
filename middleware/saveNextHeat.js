var mysql = require('mysql');
var connection = require('../config/config');
var path = require('path');
var fs = require('fs');

function dbconnect(callback, data, actualId) {
    var upupdateOldHeat = 'UPDATE ' + connection.config.database + '.Heat SET isActive = 0 WHERE idHeat = actualId';
    var upupdateNewHeat = 'UPDATE ' + connection.config.database + '.Heat SET isActive = 1 WHERE idHeat = ' + (actualId + 1);

    connection.query(upupdateOldHeat,
        function(err,rows){
            return callback(err, rows);
        });

    connection.query(upupdateNewHeat,
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {
    return function (req, res, next) {
        var data = req.body;
        var actualId = req.params.actual_heat_id;

        dbconnect(function(err, results){
            if (err) {
                res.tpl.msg = err;
            }
            else {
                console.log(results)
            }
            return next();
        },data, actualId);
    };
};

var mysql = require('mysql');
var connection = require('../config/config');

function setNewActive(callback, actualId) {
    var upupdateNewHeat = 'UPDATE ' + connection.config.database + '.Heat SET isActive = 1 WHERE roundIndex = ' + (actualId + 1);

    connection.query(upupdateNewHeat,
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {
    return function (req, res, next) {

        var actualId = req.params.roundIndex;

        setNewActive(function(err, results){
            if (err) {
                console.log(err);
            }
            else {
                console.log(results)
            }
            return next();
        }, actualId);

    };
};

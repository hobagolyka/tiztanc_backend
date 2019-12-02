var mysql = require('mysql');
var connection = require('../config/config');

function setOldActive(callback, actualId) {
    var upupdateOldHeat = 'UPDATE heat SET isActive = 0 WHERE roundIndex = ' + actualId;

    connection.query(upupdateOldHeat,
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {
    return function (req, res, next) {

        var actualId = req.params.roundIndex;

        setOldActive(function(err, results){
            if (err) {
                console.log(err);
            }
            else {
                //console.log(results)
            }
            return next();
        }, actualId);
    };
};

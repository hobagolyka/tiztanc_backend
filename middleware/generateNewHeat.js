var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(callback, roundId) {

    connection.query("SELECT * FROM results Where round_id = " + mysql.escape(roundId), function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {

        var roundIndex = req.params,roundIndex;

        /* ---------------------------------------------------- FOR saveRESULT
        var keys = Object.keys(req.body.values);
        var votes = [];

        keys.forEach(function(item){
            if(item === 'name' || item === 'idEvent' || item === 'roundIndex')
            {}
            else {
                votes.push(parseInt(item));
            }
        });
        ---------------------------------------------------------------------*/

        /*
        dbconnect(function(err, result){
            if (err) throw err;
            else {
                console.log(result);
            }
            return next();
        }, roundIndex);
        */
    };
};
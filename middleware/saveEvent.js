var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {

    connection.query('INSERT INTO ' + mysql.escape(connection.database) + '.Event ' +
        '(idEvent, name, token, judges, limit, final, resultId, heatId) VALUES ('
        +mysql.escape(data.id) + ',' +
        + mysql.escape(data.name) + ',' +
        + mysql.escape(data.token) + ',' +
        + mysql.escape(data.judges) + ',' +
        + mysql.escape(data.limit) + ',' +
        + mysql.escape(data.final) + ',' +
        + mysql.escape(data.resultId) + ',' +
        + mysql.escape(data.heatId) + ");",
        function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
        console.log("Saving event data to the db...");

        var type = req.param('type');
        var data = res.body;

        dbconnect(req, function(err, result){
            if (err) throw err;
            else {
                return result;
            }
            return next();
        }, type, data);
    };
};
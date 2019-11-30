var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {
    var historyQuery = 'SELECT * FROM '+ connection.config.database +'.Event as event INNER JOIN ' +
        connection.config.database + '.Heat as heat ON heat.eventId = event.IdEvent ' +
        'WHERE event.isClosed = 0';

    connection.query(historyQuery, function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
        console.log("get data middleware");

        var type = req.param('type');
        var data = res.body;
        dbconnect(req, function(err, result){
            if (err) throw err;
            else {

            }
            return next();
        }, type, data);
    };
};

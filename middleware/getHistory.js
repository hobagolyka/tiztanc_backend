var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {
    var historyQuery = 'SELECT * FROM '+ connection.config.database +'.Event as event INNER JOIN ' +
        connection.config.database + '.Heat as heat ON heat.eventId = event.IdEvent ' +
        'INNER JOIN ' + connection.config.database + '.Result as result ON result.eventId = event.IdEvent ' +
        'INNER JOIN ' + connection.config.database + '.Pair as pair ON pair.idPair = result.pair_id ' +
        'INNER JOIN ' + connection.config.database + '.Judge as judge ON judge.idJudge = result.judgeId ' +
        'WHERE event.isClosed = 0';

    connection.query(historyQuery, function(err,row){
        if (err) {throw err;}
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
        var type = req.param('type');
        var data = res.body;
        dbconnect(req, function(err, result){
            if (err) throw err;
            else {
                return result;
            }
        }, type, data);
    };
};

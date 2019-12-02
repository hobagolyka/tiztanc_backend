var mysql = require('mysql');
var connection = require('../config/config');

function dbconnect(callback, data) {
    var resultQuery = 'INSERT INTO ' + connection.config.database +'.Result (point, round_id, pair_id, danceType, judgeId, eventId) VALUES()';

    connection.query(resultQuery,
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        var roundIndex = req.params,roundIndex;

        //var bodyData = req.body;

        /* Zsűri Ilonka 1-es, 2-es, 4-es idjű párokra szavazott az 1-es idjű eventen, a 34-en roundindexű heaten */
        var testBody = { values: { '1': true,
                '2': true,
                '4': true,
                name: 'Zsűri Ilonka',
                idEvent: 1,
                roundIndex: 34
            }
        }

        var data = testBody.values;

        dbconnect(function(err, result){
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
            return next();
        }, data);
    };
};

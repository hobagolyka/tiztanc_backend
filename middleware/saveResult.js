var mysql = require('mysql');
var connection = require('../config/config');

function dbconnect(callback, data, judgeId, eventId) {
    var resultQuery = 'INSERT INTO ' + connection.config.database +'.Results (round_id, pair_id, danceType, judgeId, eventId) VALUES ?';

    var values = [];
    //var ids = [];
    var votes = [];

    Object.keys(data).forEach(function(item){
        if(item === 'name' || item === 'idEvent' || item === 'roundIndex')
        {}
        else {
            votes.push(parseInt(item));
        }
    });
    /*for(var i = 0; i<Object.keys(data).length; i++) {
        if (parseInt(Object.keys(data)[i])) { // if not NaN
            ids.push(parseInt(Object.keys(data)[i]));
        }
    }*/
    for (var i = 0; i<votes.length; i++) {
        values.push([mysql.escape(data.roundIndex), mysql.escape(votes[i]), mysql.escape(data.danceType), mysql.escape(judgeId), mysql.escape(eventId)]);
    }
    connection.query(resultQuery, [values],
        function(err,rows){
            if(err){throw err;}
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        var roundIndex = req.params,roundIndex;
        var judgeId = res.judgeId;
        //var bodyData = req.body.values;

        /* Zsűri Ilonka 1-es, 2-es, 4-es idjű párokra szavazott az 1-es idjű eventen, a 34-en roundindexű heaten */
        var testBody = { values: { '1': true,
                '2': true,
                '4': true,
                name: 'Zsűri Ilonka',
                idEvent: 1,
                roundIndex: 34,
                danceType: "Kezdő Keringő"
            }
        };
        //For testing
        judgeId = 1;
        eventId = testBody.idEvent;
        //For testing
        var data = testBody.values;

        dbconnect(function(err, result){
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
            return next();
        }, data, judgeId, roundIndex);

    };
};

var connection = require('../config/config');
var mysql = require('mysql');

var numsOfHeat = {};
var currentDanceIndex = 0;
var pairsInserted = 0;
var roundIndex = 0;

function dbConnect(eventId, danceTypes, firstPair, affectedPairs, roundIndex) {
    var heatQuery = 'INSERT INTO ' + connection.config.database + '.Heat (danceType, eventId, pairId, isActive, roundIndex) VALUES ?';
    var values = [];
    var isActive = 1;

    if(currentDanceIndex !== 0) {isActive = 0;}
    for (var j = 0; j < affectedPairs; j++) {

        values.push([danceTypes[currentDanceIndex], eventId, (firstPair + j), isActive, roundIndex]);
    }

    connection.query(heatQuery, [values], (err, result) => {
        if(err) {throw err;}
        //console.log("Heat inserted. Id: " + result.insertId + ". Affected: " + result.affectedRows);
    });
}


module.exports = function () {

    return function (req, res, next) {

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

/*

        dbconnect(function(err, result){
            if (err) throw err;
            else {
                console.log(result);
            }
            return next();
        }, data);
        */
    };
};
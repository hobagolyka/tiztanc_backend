var connection = require('../config/config');
var mysql = require('mysql');

var numsOfHeat = {};
var currentDanceIndex = 0;
var pairsInserted = 0;
var roundIndex = 0;

function insertHeat(eventId, danceTypes, firstPair, affectedPairs, roundIndex) {
    var heatQuery = 'INSERT INTO ' + connection.config.database + '.Heat (danceType, eventId, pairId, isActive, roundIndex) VALUES ?';
    var values = [];
    var isActive = 1;

    if(roundIndex !== 0) {isActive = 0;}
    for (var j = 0; j < affectedPairs; j++) {
        values.push([danceTypes[currentDanceIndex], eventId, (firstPair + j), isActive, roundIndex]);
    }

    connection.query(heatQuery, [values], (err, result) => {
        if(err) {throw err;}
        console.log("Heat inserted. Id: " + result.insertId + ". Affected: " + result.affectedRows);
    });
}

function insertPairs(eventId, heatData) {
    var danceTypes = Object.keys(heatData);
    var pairQuery = "INSERT INTO " + connection.config.database + ".Pair (name1, name2, school) VALUES ?";

    for (var i = 0; i <danceTypes.length; i++) {
        numsOfHeat[danceTypes[i]] = heatData[danceTypes[i]].length;
    }

    for (var i = 0; i < danceTypes.length; i++) {
        var pairs = heatData[danceTypes[i]]; // tömbk tömbjének tömbje

        for (var pairInd = 0; pairInd < pairs.length; pairInd++) {
            // pairs[pairInd]: tömbök tömbje
            connection.query(pairQuery, [pairs[pairInd]], function (err, result)  {
                if (err) {throw err;}
                else {
                    //console.log("Pair inserted. Id: " + result.insertId + ". Affected: " + result.affectedRows);
                    pairsInserted++;
                    insertHeat(eventId, danceTypes, result.insertId, result.affectedRows, roundIndex++);

                    if (pairsInserted == numsOfHeat[danceTypes[currentDanceIndex]]) {
                        pairsInserted = 0;
                        currentDanceIndex++;
                    }
                }
            });
        }
    }
}

function dbconnect(callback, eventData, heatData) {
    currentDanceIndex = 0;
    pairsInserted = 0;
    numsOfHeat = {};
    //console.log(Object.keys(eventData));
    //console.log(Object.keys(heatData));

    //console.log("Saving event...");
    connection.query('INSERT INTO ' + connection.config.database + '.Event'
    + '(name, judgeToken, judges, pairLimit, finalLimit, date, isClosed, percent) VALUES ('
        + mysql.escape(eventData.eventName) + ', '
        + mysql.escape(eventData.judgeToken) + ', '
        + mysql.escape(eventData.judges) + ', '
        + mysql.escape(eventData.pairLimit) + ', '
        + mysql.escape(eventData.finalLimit) + ', '
        + mysql.escape(eventData.startDate) + ', '
        + mysql.escape(eventData.isClosed) + ', '
        + mysql.escape(eventData.percent) + ')',
        function(err,result){
        if (err) {
            throw err;
        } else {
            //console.log("Event saved with id: " + result.insertId);
            //console.log("Affected row(s): " + result.affectedRows);

            insertPairs(result.insertId, heatData);
            return callback(err, result);
        }
    });
}

module.exports = function () {

    return function (req, res, next) {
        currentDanceIndex = 0;
        pairsInserted = 0;
        numsOfHeat = {};

        var bodyData = req.body;
        var data = bodyData.eventData;

        var eventData = {
            eventName: data.name,
            judgeToken: data.token,
            judges: data.judges,
            percent: data.percent,
            pairLimit: data.limit,
            finalLimit: data.final,
            startDate: data.date,
            isClosed: 0
        };

        //console.log(Object.keys(data.heats));

        dbconnect(function(err, result){
            if (err) throw err;
            else {
                //console.log(result);
                return next();
            }
        }, eventData, data.heats);
    };
};
var connection = require('../config/config');
var mysql = require('mysql');

var numsOfHeat = {};
var currentDanceIndex = 0;
var pairsInserted = 0;

function insertHeat(eventId, danceTypes, firstPair, affectedPairs) {
    var heatQuery = 'INSERT INTO ' + connection.config.database + '.Heat (danceType, eventId, pairId, isActive, roundIndex) VALUES ?';
    var values = [];
    var isActive = 1;

    if(currentDanceIndex !== 0) {isActive = 0;}
    for (var j = 0; j < affectedPairs; j++) {
        values.push([danceTypes[currentDanceIndex], eventId, (firstPair + j), isActive, currentDanceIndex + 1]);
    }

    connection.query(heatQuery, [values], (err, result) => {
        if(err) {throw err;}
        console.log("Heat inserted. Id: " + result.insertId + ". Affected: " + result.affectedRows);
    });
}

function insertPairs(eventId, heatData, callback) {
    var danceTypes = Object.keys(heatData);
    var pairQuery = "INSERT INTO " + connection.config.database + ".Pair (name1, name2, school) VALUES ?";

    for (var i = 0; i <danceTypes.length; i++) {
        numsOfHeat[danceTypes[i]] = heatData[danceTypes[i]].length;
    }
    //console.log("Heats: "+JSON.stringify(numsOfHeat));

    for (var i = 0; i < danceTypes.length; i++) {
        var pairs = heatData[danceTypes[i]]; // tömbk tömbjének tömbje
        for (var pairInd = 0; pairInd < pairs.length; pairInd++) {
            // pairs[pairInd]: tömbök tömbje
            connection.query(pairQuery, [pairs[pairInd]], function (err, result)  {
                if (err) {throw err;}
                else {
                    console.log("Pair inserted. Id: " + result.insertId + ". Affected: "+result.affectedRows);
                    insertHeat(eventId, danceTypes, result.insertId, result.affectedRows);
                    pairsInserted++;
                    if (pairsInserted == numsOfHeat[danceTypes[currentDanceIndex]]) {
                        pairsInserted = 0;
                        currentDanceIndex++;
                    }
                }
            });
        }
    }
}

function dbconnect(req, callback, type, eventData, heatData) {
    console.log("Saving event...");
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
            console.log("Event saved with id: " + result.insertId);
            console.log("Affected row(s): " + result.affectedRows);
            insertPairs(result.insertId, heatData, callback);
            return callback(err, result);
        }
    });
}

module.exports = function () {

    return function (req, res, next) {
        console.log("Saving event data to the database...");

        var type = req.param('type');
        var bodyData = req.body;

        var bodyData = { eventData:
                { name: '2019 záróverseny',
                    token: 78177,
                    judges: 4,
                    percent: 50,
                    limit: 20,
                    final: 6,
                    heats:
                        { 'Kezdő Keringő': [[
                                ["Kovács Gábor", "Tóth Ildikó", "ELTE"],
                                ["Koasdf SDedfg", "Oplsdf e Ildikó", "BME"]
                            ]],
                            'Kezdő Tangó': [[
                                ["Kovács Gábor", "Tóth Ildikó", "ELTE"],
                                ["Kovács Gábor", "Tóth Ildikó", "BME"]
                            ]],
                            'E osztályos Keringő': [[
                                ["Kovács János", "Számai Janka", "SZIT"],
                                ["Il Gábor", "Zsámbék Ilona", "ASD"]
                            ]
                            ],
                            'E osztályos Standard (TQ)': [
                                [
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"],
                                    ["Kov‡cs Gábor", "Tóth Ildikó", "ELTE"]
                                ],
                                [
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                    ["Masodik József", "Masodik Tamara", "BME"],
                                ],
                                [
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                    ["Harmadik József", "Harmadik Tamara", "BME"],
                                ]
                            ]
                        }
                }
        };

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

        dbconnect(req, function(err, result){
            if (err) throw err;
            else {
                return result;
            }
            return next();
        }, type, eventData, data.heats);
    };
};
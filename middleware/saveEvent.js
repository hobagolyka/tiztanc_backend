var connection = require('../config/config');
var mysql = require('mysql');

var eventId = -1;
var pairId = -1;

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
            eventId = result.insertId;
            //return result;
        }
    });

    console.log("ASD\n" + eventId+"\nASD");
    var danceTypes = Object.keys(heatData);
    var pairQuery = 'INSERT INTO ' + connection.config.database + '.Pair (name1, name2, school) VALUES ?';
    var heatQuery = 'INSERT INTO ' + connection.config.database + '.Heat (danceType, eventId, pairId, isActive) VALUES ?';

    for (var i = 0; i < danceTypes.length; ++i) {
        var pairs = heatData[danceTypes[i]];
        connection.query(pairQuery, [pairs], function (err, result)  {
            if (err) {throw err;}
            else {
                pairId = result.insertId;
                console.log(result.insertId);
            }
        });

        var isActive = 1;
        if (i !== 0) { isActive = 0;}

        var values = [];
        for (var j = 0; j<pairs.length; j++) {
            values.push([danceTypes[i], eventId, pairId + j, isActive]);
        }
        console.log(values);

        connection.query(heatQuery, [values], (err, result) => {
            if(err) {throw err;}
            console.log("Heat inserted. Id: " + result.insertId);
            return callback(err, result);
        });
    }
}

module.exports = function () {

    return function (req, res, next) {
        console.log("Saving event data to the database...");

        var type = req.param('type');
        //const bodyData = res.body;
        const bodyData = { eventData:
                { name: '2019 záróverseny',
                    token: 78177,
                    judges: 4,
                    percent: 50,
                    limit: 20,
                    final: 6,
                    date: "2019.12.11.",
                    heats:
                        { 'Kezdő Keringő': [
                                ["Kovács Gábor", "Tóth Ildikó", "ELTE"],
                                ["Koasdf SDedfg", "Oplsdf e Ildikó", "BME"]
                            ],
                            'Kezdő Tangó': [
                                ["Kovács Gábor", "Tóth Ildikó", "ELTE"],
                                ["Kovács Gábor", "Tóth Ildikó", "BME"]
                            ],
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
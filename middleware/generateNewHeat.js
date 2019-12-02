var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(callback, roundId) {

    connection.query("SELECT pair_id, dancetype FROM results Where round_id = " + mysql.escape(roundId), function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
        var roundIndex = req.params.roundIndex;
        var eventPercent = res.event.percent;
        var eventFinal = res.event.finalLimit;
        var activeHeat = res.activeHeat;

        dbconnect(function(err, result){
            if (err) throw err;
            else {
                let votes = {};
                let danceType = "";

                result.forEach(function (item) {
                    votes[item.pair_id] = 0;
                    danceType = item.dancetype;
                });

                result.forEach(function (item) {
                    votes[item.pair_id]++;
                });

                var sortable = [];
                for (var vote in votes) {
                    sortable.push([parseInt(vote), votes[vote], danceType]);
                }

                sortable.sort(function(a, b) {
                    return a[1] - b[1];
                });

                selected = [];

                var limit = Math.ceil(activeHeat.length/100*eventPercent);

                if(sortable.length > limit) {
                    for (var i = sortable.length - 1; i > limit - 1; i--) {
                        selected.push(sortable[i]);
                    }

                    res.newHeat = selected;
                }
                else {
                    res.newHeat = sortable;
                }
            }
            return next();
        }, roundIndex);
    };
};
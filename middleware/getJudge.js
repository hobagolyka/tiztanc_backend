var mysql = require('mysql');
var connection = require('../config/config');

function getJudgeId(callback, judgeName) {

    connection.query('SELECT idJudge FROM Judge WHERE judge_name = ' + mysql.escape(judgeName),
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {
    return function (req, res, next) {

        var data = req.body.values;
        var judgeName = data.name || "";

        getJudgeId(function(err, result){
            if (err) {
                console.log(err);
            }
            else {
                res.judgeId = result[0].idJudge;
            }
            return next();
        }, judgeName);
    };
};

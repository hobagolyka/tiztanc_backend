var mysql = require('mysql');
var connection = require('../../config/config');
var path = require('path');
var fs = require('fs');

function dbconnect(callback, data) {
    connection.query('INSERT INTO food (kaja, kaja_EN, kaja_D, leiras, leiras_EN, leiras_D, ar,type) VALUES(' +
        mysql.escape(data.etel) + ',' +
        mysql.escape(data.etel_EN) + ',' +
        mysql.escape(data.etel_D) + ',' +
        mysql.escape(data.leiras) + ',' +
        mysql.escape(data.leiras_EN) + ',' +
        mysql.escape(data.leiras_D) + ',' +
        mysql.escape(data.ar) + ',' +
        mysql.escape(data.type) + ')',
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        var p = req.body;

        if(p.etel == ''){
            res.tpl.msg = "Nem adtad meg az étel nevét.";
            return next();
        }

        if(p.ar == ''){
            res.tpl.msg = "Nem adtál meg árat.";
            return next();
        }

        dbconnect(function(err, results){
            if (err) {
                res.tpl.msg = err;
            }
            else {
                res.tpl.msg = "ok";
            }
            return next();
        },p);
    };
};

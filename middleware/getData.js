var connection = require('../config/config');
var mysql = require('mysql');

function dbconnect(req, callback, type, data) {

    connection.query('SELECT * FROM food WHERE name = ' + mysql.escape(data.name) + ', final = ' + mysql.escape(data.final), function(err,row){
        if (err) {
            throw err;
        }
        return callback(err, row);
    });
}

module.exports = function () {

    return function (req, res, next) {
    console.log("get data middleware");

        var type = req.param('type');
        var data = res.body;
        console.log(data);
        //
        data = {id:"asd-123", name: "teszt zárótánc", token:"1230012", judges:4, percent: 30, limit: 20, final: 6};
        dbconnect(req, function(err, result){
            if (err) throw err;
            else {

            }
            return next();
        }, type, data);
    };
};

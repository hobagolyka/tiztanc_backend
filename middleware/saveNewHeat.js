var mysql = require('mysql');
var connection = require('../config/config');

function dbconnect(callback, data) {
    connection.query('INSERT INTO heat () VALUES()',
        function(err,rows){
            return callback(err, rows);
        });
}

module.exports = function () {

    return function (req, res, next) {

        /* params: pair_id, beérkezett szavazat, dancetype -> az itteni példában 6 pár jutott tovább, az új heatbe ők kerülnek */
        var pairsTest = [ [ 1, 2, '\'Kezdő Keringő\'' ],
            [ 12, 2, '\'Kezdő Keringő\'' ],
            [ 15, 1, '\'Kezdő Keringő\'' ],
            [ 13, 1, '\'Kezdő Keringő\'' ],
            [ 17, 1, '\'Kezdő Keringő\'' ],
            [ 2, 1, '\'Kezdő Keringő\'' ] ];

        //var pairsReal = res.newHeat;

        dbconnect(function(err, results){
            if (err) {
                console.log(err);
            }
            else {
                console.log(results);
            }
            return next();
        }, pairsTest);
    };
};

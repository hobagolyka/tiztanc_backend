var express = require('express');
const cors = require('cors')
var router = express.Router();

/* CORS - for localhost */

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
    res.send("hello")

});

module.exports = router;

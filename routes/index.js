var express = require('express');
const cors = require('cors')
var router = express.Router();
var getData = require('../middleware/getData');

/* CORS - for localhost */

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  res.send("hello")

});

router.use('/get/:type',
    getData()
);

module.exports = router;

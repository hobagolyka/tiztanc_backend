var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tíztánc verseny szervező' });
});
/*
router.get("/results", (req, res, next) => {
  res.send("Eredmény tábla...");
});

router.get("/form", (req, res, next) => {
  res.send("A form az event létrehozásához.")
});
*/
module.exports = router;

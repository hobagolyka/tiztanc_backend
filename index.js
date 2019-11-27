/* ez a modul a belépő pontja az alkalmazásnak */

const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/", (req, res, next) => {
    res.send("Index route!");
});
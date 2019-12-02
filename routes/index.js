var express = require('express');
const cors = require('cors');
var router = express.Router();
var saveEvent = require('../middleware/saveEvent');
var saveNewHeat = require('../middleware/saveNewHeat');
var setNewActiveHeat = require('../middleware/setNewActiveHeat');
var setOldActiveHeat = require('../middleware/setOldActiveHeat');
var saveResult = require('../middleware/saveResult');
var saveJudges = require('../middleware/saveJudges');
var saveJudge = require('../middleware/saveJudge');
var getJudge = require('../middleware/getJudge');
var getJudges = require('../middleware/getJudges');
var getEvent = require('../middleware/getEvent');
var getEventNext = require('../middleware/getEventNext');
var getEventToken = require('../middleware/getEventToken');
var getActiveHeat = require('../middleware/getActiveHeat');
var getActiveHeatNext = require('../middleware/getActiveHeatNext');
var getHistory = require('../middleware/getHistory');
var getResults = require('../middleware/getResults');
var actualEvent = require('../middleware/actualEvent');
var generateNewHeat = require('../middleware/generateNewHeat');
var getHeats = require('../middleware/getHeats');

router.get('/', cors(), function(req, res, next) {
  res.send("hello");
});

router.get('/get_active_heat/:token', cors(),
    getEventToken(),
    getActiveHeat()
);

router.get('/get_event', cors(),
    getEvent()
);

router.use('/save_event', cors(),
    saveEvent()
);

router.use('/get_actual_event', cors(),
    actualEvent()
);

router.use('/get_heats', cors(),
    getHeats()
);

router.use('/get_judges', cors(),
    getJudges()
);

router.use('/save_next_heat/:roundIndex', cors(),
    saveJudge(),
    getJudge(),
    getEventNext(),
    saveResult()
);

router.use('/get_next_heat/:roundIndex', cors(),
    getActiveHeatNext(),
    getEventNext(),
    generateNewHeat(),
    saveNewHeat()
    //setOldActiveHeat(),
    //setNewActiveHeat(),
);

router.get('/get_results', cors(),
    getResults()
);


module.exports = router;

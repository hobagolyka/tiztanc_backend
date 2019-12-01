var express = require('express');
const cors = require('cors');
var router = express.Router();
var saveEvent = require('../middleware/saveEvent');
var saveNewHeat = require('../middleware/saveNewHeat');
var saveNextHeat = require('../middleware/saveNextHeat');
var saveResult = require('../middleware/saveResult');
var saveJudges = require('../middleware/saveJudges');
var getEvent = require('../middleware/getEvent');
var getEventToken = require('../middleware/getEventToken');
var getActiveHeat = require('../middleware/getActiveHeat');
var getHistory = require('../middleware/getHistory');
var getResults = require('../middleware/getResults');

router.get('/', cors(), function(req, res, next) {
  res.send("hello");
});

router.get('/get_active_heat/:token', cors(),
    getEventToken(),
    getActiveHeat()
);

router.get('/get_history', cors(),
  getHistory()
);

router.get('/get_event', cors(),
    getEvent()
);


router.get('/get_results', cors(),
  getResults()
);

router.use('/save_event', cors(),
    saveEvent()
);

router.use('/save_judges/:eventId', cors(),
    saveJudges()
);

router.use('/save_result/:event_id/heat/:heat_id',
    saveResult(),
);

router.use('/save_next_heat/:actual_heat_id',
    saveNextHeat()
);

router.use('/save_new_heat',
    saveNewHeat()
);

module.exports = router;

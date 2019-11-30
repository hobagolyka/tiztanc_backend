var express = require('express');
const cors = require('cors');
var router = express.Router();
var saveEvent = require('../middleware/saveEvent');

router.get('/', cors(), function(req, res, next) {
  res.send("hello");
});

router.get('/get_active_heat', cors(), (req, res, next) => {
  //TODO: az aktív heat-et visszaadó fv létrehozása
});

router.get('/get_history', cors(), (req, res, next) => {
  //TODO: mindent visszaadó fv létrehozása
});

router.get('/get_results', cors(), (req, res, next) => {
  //TODO: végeredményt visszaadó fv létrehozása
});

router.use('/save_event', cors(),
    saveEvent()
);

router.use('/save_result/event_id/heat/heat_id',
    saveResult()
);

router.use('/save_next_heat/:actual_heat_id',
    setNextHeat()
);

router.use('/save_new_heat',
    saveNewHeat()
);

module.exports = router;

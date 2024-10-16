const express = require('express');
const router = express.Router();
const station = require('../controllers/station');

router.post('/stations', station.createStation);
router.get('/stations', station.getAllStations);
router.get('/stations/:id', station.getStationById);
router.put('/stations/:id', station.updateStation);

module.exports = router;

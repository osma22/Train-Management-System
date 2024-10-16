const express = require('express');
const router = express.Router();
const train = require('../controllers/train');

// Train schedule routes
router.get('/trains', train.getAllTrainSchedules);
router.get('/trains/:id', train.getTrainScheduleById);
router.post('/trains', train.createTrainSchedule);
router.put('/trains/:id', train.updateTrainSchedule);
router.delete('/trains/:id', train.deleteTrainSchedule);

module.exports = router;

const Train = require('../models/train');

// Get all train schedules
exports.getAllTrainSchedules = async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get train schedule by ID
exports.getTrainScheduleById = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) return res.status(404).json({ message: 'Train schedule not found' });
        res.json(train);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new train schedule
exports.createTrainSchedule = async (req, res) => {
    const { trainName, stops, departureTime, arrivalTime } = req.body;

    try {
        const newTrain = new Train({ trainName, stops, departureTime, arrivalTime });
        await newTrain.save();
        res.status(201).json(newTrain);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update train schedule
exports.updateTrainSchedule = async (req, res) => {
    const { trainName, stops, departureTime, arrivalTime } = req.body;

    try {
        const train = await Train.findById(req.params.id);
        if (!train) return res.status(404).json({ message: 'Train schedule not found' });

        train.trainName = trainName;
        train.stops = stops;
        train.departureTime = departureTime;
        train.arrivalTime = arrivalTime;

        await train.save();
        res.json(train);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete train schedule
exports.deleteTrainSchedule = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) return res.status(404).json({ message: 'Train schedule not found' });

        await train.remove();
        res.json({ message: 'Train schedule deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

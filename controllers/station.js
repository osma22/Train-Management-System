const Station = require('../models/station');

// Create a new station
exports.createStation = async (req, res) => {
    const { stationName, stationCode, location, trains } = req.body;

    try {
        // Create a new station
        const newStation = new Station({
            stationName,
            stationCode,
            location,
            trains
        });

        // Save station to the database
        await newStation.save();
        res.status(201).json(newStation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all stations
exports.getAllStations = async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single station by ID
exports.getStationById = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) return res.status(404).json({ message: 'Station not found' });
        res.json(station);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a station by ID
exports.updateStation = async (req, res) => {
    const { stationName, stationCode, location, trains } = req.body;

    try {
        // Find the station by ID
        const station = await Station.findById(req.params.id);
        if (!station) return res.status(404).json({ message: 'Station not found' });

        // Update station fields
        station.stationName = stationName;
        station.stationCode = stationCode;
        station.location = location;
        station.trains = trains;

        // Save updated station
        await station.save();
        res.json(station);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a station by ID
exports.deleteStation = async (req, res) => {
    try {
        // Find the station by ID
        const station = await Station.findById(req.params.id);
        if (!station) return res.status(404).json({ message: 'Station not found' });

        // Delete the station
        await station.remove();
        res.json({ message: 'Station deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const mongoose = require("mongoose");

const trainStopSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true,
        trim: true
    },
    arrivalTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{2}:\d{2}/.test(v);  // Validates time in HH:MM format
            },
            message: props => `${props.value} is not a valid time format! Use HH:MM`
        }
    },
    departureTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{2}:\d{2}/.test(v);  // Validates time in HH:MM format
            },
            message: props => `${props.value} is not a valid time format! Use HH:MM`
        }
    }
});

// Schema for station information
const stationSchema = new mongoose.Schema({
    stationName: {
        type: String,
        required: [true, "Station name is required"],
        unique: true,
        trim: true,
        minlength: [2, "Station name must be at least 2 characters long"]
    },
    stationCode: {
        type: String,
        required: [true, "Station code is required"],
        unique: true,
        uppercase: true,
        trim: true,
        minlength: [2, "Station code must be at least 2 characters long"],
        maxlength: [5, "Station code can't exceed 5 characters"]
    },
    location: {
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true
        }
    },
    trains: [trainStopSchema]  // Embeds the train stop schema
});

// Model for station
const Station = mongoose.model("Station", stationSchema);
module.exports = Station;

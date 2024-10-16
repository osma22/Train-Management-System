const mongoose = require("mongoose");

const trainStopSchema = new mongoose.Schema({
    station: {
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

const trainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true,
        trim: true
    },
    stops: [trainStopSchema],  // Embed the train stop schema here
    departureTime: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{2}:\d{2}/.test(v);  // Validates time in HH:MM format
            },
            message: props => `${props.value} is not a valid time format! Use HH:MM`
        }
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
    }
});

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;

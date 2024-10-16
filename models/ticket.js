// models/ticket.js
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true,
    },
    trainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Train", // Assuming you have a Train model
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    stopIndex: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

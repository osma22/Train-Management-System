const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ["credit", "debit"],
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: [transactionSchema]
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;

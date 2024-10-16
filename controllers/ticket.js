const Wallet = require("../models/wallet");
const Train = require("../models/train");
const Ticket = require("../models/ticket"); // Import Ticket model

// controllers/ticket.js
exports.purchaseTicket = async (req, res) => {
    const { userId, trainId, stopIndex, fare } = req.body;

    try {
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) return res.status(404).json({ message: "Wallet not found" });

        const train = await Train.findById(trainId);
        if (!train) return res.status(404).json({ message: "Train not found" });

        if (stopIndex < 0 || stopIndex >= train.stops.length) {
            return res.status(400).json({ message: "Invalid stop index" });
        }

        const providedFare = parseFloat(fare);
        if (isNaN(providedFare) || providedFare <= 0) {
            return res.status(400).json({ message: "Invalid fare amount" });
        }

        if (wallet.balance < providedFare) {
            return res.status(400).json({ message: "Insufficient wallet balance" });
        }

        wallet.balance -= providedFare;

        if (typeof wallet.balance !== "number" || isNaN(wallet.balance)) {
            return res.status(500).json({ message: "Wallet balance error" });
        }

        wallet.transactions.push({
            amount: providedFare,
            type: "debit",
            description: `Purchased ticket for ${train.trainName} at stop ${train.stops[stopIndex].station}`
        });

        // Save updated wallet
        await wallet.save();

        // Save the ticket information
        const ticket = new Ticket({
            userId,
            trainId,
            fare: providedFare,
            stopIndex
        });

        await ticket.save(); // Save ticket to database

        res.status(200).json({ message: "Ticket purchased successfully", fare: providedFare });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

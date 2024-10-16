const Wallet = require("../models/wallet");

// Add funds to user wallet
exports.addFunds = async (req, res) => {
    const { userId, amount, description } = req.body;

    try {
        // Find the wallet by userId
        let wallet = await Wallet.findOne({ userId });
        
        // If the wallet doesn't exist, create it
        if (!wallet) {
            wallet = new Wallet({ userId, balance: 0 });
        }

        // Update balance and transaction history
        wallet.balance += amount;
        wallet.transactions.push({
            amount,
            type: "credit",
            description
        });

        await wallet.save();
        res.status(200).json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get wallet balance and transaction history
exports.getWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.userId });
        if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
        res.json(wallet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

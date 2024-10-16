const express = require("express");
const router = express.Router();
const wallet = require("../controllers/wallet");

router.post("/add-funds", wallet.addFunds);
router.get("/:userId", wallet.getWallet);

module.exports = router;

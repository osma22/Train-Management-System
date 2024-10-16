const express = require("express");
const router = express.Router();
const ticket = require("../controllers/ticket");

// Route to purchase tickets
router.post("/purchase", ticket.purchaseTicket);

module.exports = router;

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

dotenv.config(); // Load environment variables

const app = express(); // Create server using express

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware to handle JSON
app.use(express.urlencoded({ extended: true })); // For handling URL-encoded data
app.use(cookieParser());
app.use(morgan("tiny")); // Logging middleware

// Session middleware for Passport
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection URL
const url = "mongodb://localhost:27017/user";

// Connect to MongoDB
mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

// Import Routes
const userRoutes = require("./routes/user");
const trainRoutes = require("./routes/train");
const stationRoutes = require("./routes/station");
const walletRoutes = require("./routes/wallet");
const ticketRoutes = require("./routes/ticket");

// Routes middleware
app.use("/api", userRoutes);
app.use("/api", stationRoutes);
app.use("/api", trainRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/tickets", ticketRoutes);

// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 5000; // Use uppercase PORT
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

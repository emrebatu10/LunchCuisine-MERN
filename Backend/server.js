const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const mainRoute = require("./routes/index.js");
const cors = require('cors');
const path = require('path');

dotenv.config();

// Make MongoDB connection asynchronously
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Stop the application on error
    }
};

// Middlewares
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // Parse all incoming requests as JSON

// Redirect to root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Lunch Cuisine API!");
});



// API routes
app.use("/api", mainRoute);

// 404 error management
app.all("*", (req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
const startServer = async () => {
    await connect(); // Wait until MongoDB connection is successful
    app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
    });
};

// Start the server
startServer();

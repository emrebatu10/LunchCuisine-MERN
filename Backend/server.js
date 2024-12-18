const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const dotenv = require("dotenv");
const mainRoute = require("./routes/index.js");
const cors = require('cors');

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb");

    } catch (error) {
        throw (error);

    }
}

// middlewares

app.use(express.json()); // Convert all incoming files to json
app.use("/api",mainRoute);
app.use(cors());


app.listen(port, () => {
    connect();
    console.log("The server is running on port 5000");
})
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const dotenv = require("dotenv");
const mainRoute = require("./routes/index.js");
const cors = require('cors');
const path = require('path');

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


// Serve dist folder statically
app.use(express.static(path.join(__dirname, '../Frontend/dist')));



// Return React's index.html for all other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));

});


app.listen(port, () => {
    connect();
    console.log("The server is running on port 5000");
})
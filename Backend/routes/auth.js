const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Create new user  -- register --

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res
                .status(400)
                .json({ error: "Email address already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json(newUser);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});





// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})

// Login

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ error: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            avatar: user.avatar


        });




    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }



});


module.exports = router;
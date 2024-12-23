const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Create new user (register)
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ error: "Email address already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error fetching users" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Respond with user details
        res.status(200).json({
            message: "Login successful",
            id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Server error during login" });
    }
});

module.exports = router;

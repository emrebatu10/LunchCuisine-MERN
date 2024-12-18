const express = require("express");
const router = express.Router();
const Category = require("../models/category.js");


// Create new category 
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = newCategory({ name });
        await newCategory.save();
        res.status(201).json(newCategory); // success status code 

    } catch (error) {
        console.log(error)
    }
})


//  Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" })
    }
})

// Get single category

// Update category

// Delete category

module.exports = router;



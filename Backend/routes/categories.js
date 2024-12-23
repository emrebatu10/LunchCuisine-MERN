const express = require("express");
const router = express.Router();
const Category = require("../models/category.js");

// Create new category
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;

       
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory); // Successful creation status

    } catch (error) {
        console.log("Error creating category:", error);
        res.status(500).json({ error: "Failed to create category" });
    }
});

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch (error) {
        console.log("Error fetching categories:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// Get single category
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.log("Error fetching category:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Update category
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log("Error updating category:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete category
router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.log("Error deleting category:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

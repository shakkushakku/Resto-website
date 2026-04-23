const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET ALL MENU ITEMS
router.get('/', (req, res) => {
    const sql = "SELECT * FROM menu_items";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// GET SINGLE ITEM
router.get('/:id', (req, res) => {
    const sql = "SELECT * FROM menu_items WHERE id = ?";
    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Item not found" });
        res.json(data[0]);
    });
});

const multer = require('multer');
const path = require('path');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// ... existing GET routes ...

// ADD MENU ITEM (Chef Only) -- with Image Upload
router.post('/add', upload.single('image'), (req, res) => {
    const { name, price, category } = req.body;
    let image_url = "";

    if (req.file) {
        image_url = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    const sql = "INSERT INTO menu_items (name, price, category, image_url) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, price, category, image_url], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: "Item added successfully" });
    });
});

// EDIT MENU ITEM
router.put('/update/:id', (req, res) => {
    const { name, price, category, image_url } = req.body;
    const sql = "UPDATE menu_items SET name = ?, price = ?, category = ?, image_url = ? WHERE id = ?";
    db.query(sql, [name, price, category, image_url, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item updated successfully" });
    });
});

// DELETE MENU ITEM
router.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM menu_items WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item deleted successfully" });
    });
});

module.exports = router;

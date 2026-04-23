const express = require('express');
const router = express.Router();
const db = require('../config/db');

// REGISTER
router.post('/register', (req, res) => {
    const { full_name, username, password, phone, email, city } = req.body;

    // 1. Create User
    const sqlUser = "INSERT INTO users (username, password, role) VALUES (?, ?, 'customer')";
    db.query(sqlUser, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);

        const userId = result.insertId;

        // 2. Create Customer Profile
        const sqlCustomer = "INSERT INTO customer (id, full_name, phone, email, city) VALUES (?, ?, ?, ?, ?)";
        db.query(sqlCustomer, [userId, full_name, phone, email, city], (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// LOGIN
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sql, [username, password], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = data[0];
        res.json({
            id: user.id,
            username: user.username,
            role: user.role
        });
    });
});

// CHANGE PASSWORD
router.post('/changepassword', (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    // Verify old password
    const sqlCheck = "SELECT * FROM users WHERE id = ? AND password = ?";
    db.query(sqlCheck, [userId, oldPassword], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(401).json({ message: "Incorrect old password" });

        // Update password
        const sqlUpdate = "UPDATE users SET password = ? WHERE id = ?";
        db.query(sqlUpdate, [newPassword, userId], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Password updated successfully" });
        });
    });
});

module.exports = router;

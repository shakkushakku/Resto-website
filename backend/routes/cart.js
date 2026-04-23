const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET CART ITEMS FOR USER
router.get('/:userId', (req, res) => {
    const sql = `
        SELECT cart.id as cart_id, cart.quantity, menu_items.* 
        FROM cart 
        JOIN menu_items ON cart.item_id = menu_items.id 
        WHERE cart.user_id = ?
    `;
    db.query(sql, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// ADD TO CART
router.post('/add', (req, res) => {
    const { user_id, item_id, quantity } = req.body;

    // Check if item already in cart
    const checkSql = "SELECT * FROM cart WHERE user_id = ? AND item_id = ?";
    db.query(checkSql, [user_id, item_id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) {
            // Update quantity
            const newQty = data[0].quantity + parseInt(quantity);
            const updateSql = "UPDATE cart SET quantity = ? WHERE id = ?";
            db.query(updateSql, [newQty, data[0].id], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Cart updated" });
            });
        } else {
            // Insert new
            const insertSql = "INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)";
            db.query(insertSql, [user_id, item_id, quantity], (err, result) => {
                if (err) return res.status(500).json(err);
                res.status(201).json({ message: "Added to cart" });
            });
        }
    });
});

// UPDATE QUANTITY
router.put('/update', (req, res) => {
    const { cart_id, quantity } = req.body;
    const sql = "UPDATE cart SET quantity = ? WHERE id = ?";
    db.query(sql, [quantity, cart_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Quantity updated" });
    });
});

// REMOVE ITEM
router.delete('/remove/:id', (req, res) => {
    const sql = "DELETE FROM cart WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Item removed" });
    });
});

// CLEAR CART
router.delete('/clear/:userId', (req, res) => {
    const sql = "DELETE FROM cart WHERE user_id = ?";
    db.query(sql, [req.params.userId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cart cleared" });
    });
});

module.exports = router;

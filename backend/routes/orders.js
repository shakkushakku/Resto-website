const express = require('express');
const router = express.Router();
const db = require('../config/db');

// PLACE ORDER
router.post('/place', (req, res) => {
    const { user_id, cart_items } = req.body;

    // We expect cart_items to be an array of {item_id, quantity}
    // But per documentation logic, we usually migrate from SQL cart table.
    // Let's implement the documented "Atomic Transaction Simulation": 
    // Data Migration: INSERT INTO orders SELECT FROM cart.

    // 1. Get Cart Items from DB for this user
    const getCartSql = "SELECT item_id, quantity FROM cart WHERE user_id = ?";
    db.query(getCartSql, [user_id], (err, items) => {
        if (err) return res.status(500).json(err);
        if (items.length === 0) return res.status(400).json({ message: "Cart is empty" });

        // 2. Insert into Orders (Looping for simplicity in this teaching project)
        items.forEach(item => {
            const orderSql = "INSERT INTO orders (user_id, item_id, quantity, status) VALUES (?, ?, ?, 'pending')";
            db.query(orderSql, [user_id, item.item_id, item.quantity], (err) => {
                if (err) console.error(err);
            });
        });

        // 3. Clear Cart
        const clearCartSql = "DELETE FROM cart WHERE user_id = ?";
        db.query(clearCartSql, [user_id], (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Order placed successfully" });
        });
    });
});

// GET PENDING ORDERS (Chef)
router.get('/pending', (req, res) => {
    const sql = `
        SELECT orders.id as order_id, users.username, menu_items.name as item_name, orders.quantity, orders.status, orders.order_date
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN menu_items ON orders.item_id = menu_items.id
        WHERE orders.status = 'pending'
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// GET COMPLETED ORDERS (Chef)
router.get('/completed', (req, res) => {
    const sql = `
        SELECT orders.id as order_id, users.username, menu_items.name as item_name, orders.quantity, orders.status, orders.order_date
        FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN menu_items ON orders.item_id = menu_items.id
        WHERE orders.status = 'completed'
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// COMPLETE ORDER
router.put('/complete/:id', (req, res) => {
    const sql = "UPDATE orders SET status = 'completed' WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order marked as completed" });
    });
});

module.exports = router;

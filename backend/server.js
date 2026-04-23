const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Menu Order Backend is Running!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
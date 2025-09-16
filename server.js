const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Root redirect
app.get('/', (req, res) => {
    res.redirect('/master/login');
});

// GET login page
app.get('/master/login', (req, res) => {
    res.render('login');
});

// POST login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (
        username === process.env.MASTER_USERNAME &&
        password === process.env.MASTER_PASSWORD
    ) {
        res.redirect('/master/dashboard');
    } else {
        res.send('Invalid username or password');
    }
});

// GET dashboard
app.get('/master/dashboard', (req, res) => {
    res.render('dashboard', { user: { username: process.env.MASTER_USERNAME } });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

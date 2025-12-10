// Require Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sanitizer = require('express-sanitizer');
const mysql = require('mysql2');
require('dotenv').config();

// Initialize App
const app = express();
const port = 8000;

// Set View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(sanitizer()); // Data Sanitization Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Body Parser Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Define application-specific data
app.locals.appData = {
    appName: "FitTrackr",
}

// Define database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
global.db = db;

app.use(session({
    secret: 'qwertyuiop',
    resave: false,
    saveUninitialized: true
}));

// Make user data available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Middleware to set current path
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Flash message middleware
app.use((req, res, next) => {
  res.locals.flash = req.session.flash || null;
  delete req.session.flash; // ensures it displays once
  next();
});

//Routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
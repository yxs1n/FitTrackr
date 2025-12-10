const express = require('express');
const router = express.Router();

// Home Route
router.get('/', function(req, res, next) {
    res.render('index.ejs')
});

// About Route
router.get('/about', function(req, res, next) {
    res.render('about.ejs')
});

module.exports = router;
// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10;
const {check, validationResult} = require('express-validator');

// For default login
const defaultPassword = 'smiths';
bcrypt.hash(defaultPassword, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash);
});

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('./login'); // redirect to login page
    } else {
        next(); // move to the next middleware function
    }
}

// Register Route
router.get('/register', (req, res, next) => {
    res.render('register.ejs')
});

router.post('/registered', [check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')], function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('register.ejs', { errors: errors.array() });
    }else {
        const plainPassword = req.body.password;
        bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            let sqlquery = 'INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES (?, ?, ?, ?, ?)';
            // Data to be inserted
            let newrecord = [req.body.username, req.body.first, req.body.last, req.body.email, hash];
            db.query(sqlquery, newrecord, (err, results) => {
                if (err) {
                    res.send('Error registering user: ' + err);
                } else {
                    console.log('User registered: ' + req.body.username);
                    // Confirmation message
                    result = 'Hello ' + req.sanitize(req.body.first) + ' ' + req.sanitize(req.body.last) + ', you are now registered! We will send an email to you at ' + req.body.email
                    result += ' Your password is: ' + req.sanitize(plainPassword) + ' and your hashed password is: ' + hash
                    res.send(result);
                }
            });
        });
    }
});

// Login Route
router.get('/login', (req, res, next) => {
    res.render('login.ejs')
});

module.exports = router;


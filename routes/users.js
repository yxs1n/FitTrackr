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

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.session.flash = {
      type: 'error',
      message: 'You must be logged in to access that page.'
    };
    return res.redirect('/users/login');
  }
  next();
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
                    // Handle duplicate username or email error
                    req.session.flash = {
                        type: 'error',
                        message: 'Error during registration. Please try again.'
                    };
                    res.redirect('/users/register');
                } else {
                    console.log('User registered: ' + req.body.username);
                    // Confirmation message
                    req.session.flash = {
                        type: 'success',
                        message: 'Registration successful. You can now log in.'
                    };
                    // Redirect to login page
                    res.redirect('/users/login');
                }
            });
        });
    }
});

// Login Route
router.get('/login', (req, res, next) => {
    res.render('login.ejs')
});

router.post('/loggedin', function(req, res, next) {
    const username = req.body.username;

    let sqlquery = 'SELECT * FROM users WHERE username = ?';
    db.query(sqlquery, [username], (err, results) => {
        if (err) {
            next(err);
        }
        if (results.length === 0) {
            // No such user
            req.session.flash = {
                type: 'error',
                message: 'No such user found.'
            };
            res.redirect('/users/login');
        } else {
            const hashedPassword = results[0].hashedPassword;
            bcrypt.compare(req.body.password, hashedPassword, function(err, passwordMatch) {
                if (err) {
                    next(err);
                }
                if (passwordMatch) {
                    // Passwords match
                    req.session.user = {
                        userid: results[0].id,
                        username: results[0].username,
                        firstName: results[0].firstName,
                        lastName: results[0].lastName,
                    }
                    // Set flash message
                    req.session.flash = {
                        type: 'success',
                        message: 'You have logged in successfully.'
                    };
                    // Go back to home page
                    res.redirect('/');
                } else {
                    // Passwords don't match
                    req.session.flash = {
                        type: 'error',
                        message: 'Incorrect password.'
                    };
                    res.redirect('/users/login');
                }
            });
        }
    });
});

// Logout Route
router.get('/logout', (req, res) => {
    delete req.session.user;
    // Set flash message
    req.session.flash = {
            type: 'info',
            message: 'You have been logged out successfully.'
        };

    res.redirect('/');
});

module.exports = router;


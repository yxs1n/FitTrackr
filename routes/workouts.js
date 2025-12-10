// Create a new router
const e = require("express");
const express = require("express")
const router = express.Router()
const {check, validationResult} = require('express-validator');

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/users/login');
  }
  next();
}

// Workouts Dashboard Route
router.get('/', requireLogin, (req, res, next) => {
    let sqlquery = 'SELECT * FROM workouts WHERE user_id = ? ORDER BY date DESC';
    db.query(sqlquery, [req.session.user.userid], (err, results) => {
        if (err) {
            return next(err);
        }
        res.render('workouts.ejs', { workouts: results });
    });
});

router.get('/add', requireLogin, (req, res, next) => {
    res.render('add_workout.ejs');
});

router.post('/workoutAdded', requireLogin, [
    check('date').isISO8601().withMessage('Please enter a valid date.'),
    check('type').notEmpty().withMessage('Workout type is required.'),
    check('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer.'),
    check('calories').isInt({ min: 0 }).withMessage('Calories must be a non-negative integer.')
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // There are validation errors
        req.session.flash = {
            type: 'error',
            message: errors.array().map(err => err.msg).join(' ')
        };
        return res.redirect('/workouts/add');
    } else {
        // No validation errors, proceed to insert workout
        let sqlquery = 'INSERT INTO workouts (user_id, date, type, duration, calories, notes) VALUES (?, ?, ?, ?, ?, ?)';
        let newrecord = [
            req.session.user.userid,
            req.body.date,
            req.body.type,
            req.body.duration,
            req.body.calories,
            req.body.notes || ''
        ];
        db.query(sqlquery, newrecord, (err, results) => {
            if (err) {
                return next(err);
            }
            // Success message
            req.session.flash = {
                type: 'success',
                message: 'Workout added successfully!'
            };
            res.redirect('/workouts');
        });
    }
});
module.exports = router;
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var db = require('../db');
var router = express.Router();

// Passport local strategy for user authentication
passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.query('SELECT * FROM users WHERE username = $1', [username], function(err, result) {
    if (err) { return cb(err); }
    if (result.rows.length === 0) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    const user = result.rows[0];

    // Check if password matches
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) { return cb(err); }
      if (!isMatch) { return cb(null, false, { message: 'Incorrect username or password.' }); }

      return cb(null, user);
    });
  });
}));

// Passport serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('User ID on login:', user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.query('SELECT * FROM users WHERE id = $1', [id], function(err, result) {
    if (err) { return done(err); }
    done(null, result.rows[0]);
  });
});

// Route for login
router.post('/auth', (req, res, next) => {
  console.log('Session ID:', req.sessionID);
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.status(401).json({ success: false, message: info.message }); }

    req.logIn(user, (err) => {
      if (err) { return next(err); }
      
      // Check if the user is an admin and redirect accordingly
      if (user.is_admin) {
        return res.json({ success: true, admin: true }); // Redirect to admin page
      } else {
        return res.json({ success: true, admin: false }); // Redirect to user page
      }
    });
  })(req, res, next);
});

module.exports = router;

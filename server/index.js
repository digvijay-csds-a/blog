const express = require('express');
const path = require('path');
const pool = require('./db');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const signupRoutes = require('./router/signup');
const authRoutes = require('./router/auth'); // Import the auth routes
const write=require('./router/write');
const search=require('./router/search');
const userList=require('./router/userList');
const createRole=require('./router/createRole');
const check=require('./middleware/check');
const assign=require("./router/assign");
const deleteUser=require("./router/deleteUser");
const del=require("./router/delete");
const deleteRole=require("./router/deleteRole");
const deleteR=require("./router/deleteR");
const isAdmin=require("./middleware/admin");
const viewBlog=require("./router/viewblog");
const deleteBlog=require("./router/deleteBlog");
const deleteB=require("./router/deleteB");
const app = express();

app.use(cors());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Serve static files (CSS, JS) from the 'client' directory
app.use(express.static('client'));
app.use(express.static('uploads'));

// Middleware for parsing JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize session management
app.use(session({
  secret: 'king', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure: false, }
}));
//for only testing purpose







// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
function ensureNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/blogs');
}
// Global middleware to prevent caching of authenticated pages
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

//userList
app.use(userList);
//delete user
app.use(del);
app.use(deleteUser);
//createRole
app.get('/createRole',isAdmin,function(req, res) {
    console.log('Session data:', req.session);
    res.render('createRole');
})
app.use(createRole);
//assign role
app.use(assign);
//delete role
app.use(deleteRole);
app.use(deleteR);
//deleteblog
app.use(deleteBlog);
app.use(deleteB);
// Cache control

//admin
app.get('/admin',check,isAdmin, function(req, res) {
    res.render('admin');
})
// Middleware to ensure user is authenticated
app.use(viewBlog);
// Middleware to ensure user is NOT authenticated

// Define routes
app.get('/about', (req, res) => res.render('about'));
app.get('/help', (req, res) => res.render('help'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/terms', (req, res) => res.render('terms'));
app.get('/contact_us', (req, res) => res.render('contact_us'));

// Apply ensureNotAuthenticated to prevent access if logged in
app.get('/sign_in', (req, res) => res.render('sign_in'));
app.get('/sign_up', ensureNotAuthenticated, (req, res) => {
  const showModal = req.query.showssign_up === 'true';
  res.render('sign_up', { showModal });
});

// Apply ensureAuthenticated to protect the blog route
app.get('/blogs', check,  async (req, res) => {
  try {
      // Fetch all blogs
      const result = await pool.query('SELECT * FROM blogs ORDER BY created_at DESC');
      
      // Fetch the author's username based on logged-in user's ID
      const authorResult = await pool.query('SELECT username FROM users WHERE id=$1', [req.user.id]);
      // Check if the query returned any rows
      if (authorResult.rows.length > 0) {
          const author = authorResult.rows[0].username; // Access the username correctly
          const blogs = result.rows;
          // Pass blogs and author to the EJS template
          res.render('blog', { blogs, author });

      } else {
          // Handle case where no user was found
          res.status(404).send('Author not found');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});
app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(function(err) {  // Destroys session
            if (err) {
                console.log('Error destroying session:', err);
            }
            res.clearCookie('connect.sid');  // Ensure cookie is also cleared
            res.redirect('/');  // Redirect user to login page
        });
    });
});

//write
app.get('/write', check, (req, res) => {
    res.render('write');  // Render the write page if authenticated
});
// Use the auth routes
app.use(authRoutes);
app.use(signupRoutes);

app.use(search);




app.use(write);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

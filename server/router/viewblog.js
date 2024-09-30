const express = require('express');
const pool = require('../db');
const check = require('../middleware/check');
const router = express.Router();

router.post('/viewblog',check,(req, res) => {
    const blogId = req.body.blogID;

    pool.query('SELECT * FROM blogs WHERE id = $1', [blogId], (err, result) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (result.rows.length > 0) {
            const blog = result.rows[0];
        
            // Send blog data along with redirect URL
            res.render("blogdetail",{ blog });
        } else {
            res.status(404).send('Blog not found');
        }
    });
});

module.exports = router;

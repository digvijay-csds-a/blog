const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const schema = require('./validation'); // Joi validation schema
const router = express.Router();
router.use(express.json()); 

router.post('/account', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    // Validate input using Joi schema
    const { error } = schema.validate(req.body);
    if (error) {
        
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    try {
        // Check if user already exists by email
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Email already used.' });
        }

        // Check if username is already taken
        const userNameCheck = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userNameCheck.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already taken.' });
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into the database
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        );

        res.json({ success: true, message: 'User created successfully!' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;

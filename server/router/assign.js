const express = require('express');
const isAdmin = require('../middleware/admin');
const router = express.Router();
const pool = require("../db");
router.post('/assign',isAdmin ,async (req, res) => {
    try {
        const userRoles = req.body;
        for (const key in userRoles) {
            if (userRoles.hasOwnProperty(key)) {
                const userId = key.split('-')[1];
                const roleId = userRoles[key];
                const checkRole = await pool.query(
                    'SELECT * FROM user_roles WHERE user_id = $1', [userId]
                );
                if (checkRole.rows.length > 0) {
                    await pool.query(
                        'UPDATE user_roles SET role_id=$1 WHERE user_id=$2', [roleId, userId]
                    );
                }
                else {
                    await pool.query(
                        'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)', 
                        [userId, roleId]
                    );
                }
               
            }
        }
        res.redirect("/admin");
    }
            catch(err){
                console.error(err.message);
                res.status(500).send('Server Error');
            }
    

    });
    module.exports=router;
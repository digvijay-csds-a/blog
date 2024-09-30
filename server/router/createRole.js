const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');

const router=express.Router();
router.post('/createRole',isAdmin, async function(req, res){
    const {roleName,permissions}=req.body;
    try{
        const result=await pool.query('INSERT INTO roles (role) VALUES($1) RETURNING id',[roleName]);
        const roleId=result.rows[0].id;
        for(const permission of permissions){
            await pool.query('INSERT INTO roles_permission (role_id,permission)VALUES ($1,$2)',[roleId,permission]);
        }
        res.redirect('/admin');
    }
    catch(err){
        console.error('Error creating role:', err);
        res.status(500).send('Server error');
    }
});
module.exports=router;
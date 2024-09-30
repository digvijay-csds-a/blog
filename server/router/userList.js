const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');
const router=express.Router();
router.get('/userList',isAdmin,async (req,res)=>{
    try{
        const userResult=await pool.query("SELECT * FROM users");
        const rolesResult=await pool.query("SELECT * FROM roles");
        const users=userResult.rows;
        const roles=rolesResult.rows;
        res.render('userList',{users,roles});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});
module.exports=router;
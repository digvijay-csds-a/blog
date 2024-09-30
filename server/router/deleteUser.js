const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');
const router=express.Router();
router.get("/deleteUser",isAdmin,async (req,res)=>{
    try{
    const result = await pool.query(`
        SELECT u.id AS user_id, u.username, u.email, r.role
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id;
    `);

   const users=result.rows;
   const roles=await pool.query(`SELECT * FROM roles`);
   res.render('deleteUser',{users,roles});
} catch(err){
    console.error('Error fetching users:', error);
        res.status(500).send('Server error');
}
});
module.exports=router;
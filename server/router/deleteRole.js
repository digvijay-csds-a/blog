const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');
const router=express.Router();
router.get("/deleteRole",isAdmin,async function(req, res) {
    try{
    const result=await pool.query(`SELECT * FROM roles`);
    const roles=result.rows;
    res.render('deleteRole',{roles});
    }
    catch(error){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports=router;
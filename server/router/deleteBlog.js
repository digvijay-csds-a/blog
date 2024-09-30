const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');
const router=express.Router();

router.get("/deleteBlog",isAdmin,async function(req, res) {
    try {
        
       const result=await pool.query("SELECT * FROM blogs");
       if(result.rows.length>0)
       {   console.log(result.rows[0].title);
           const blogs=result.rows;
           res.render('deleteBlog',{blogs});  
       }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
module.exports=router;
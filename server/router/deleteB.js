const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');
const router=express.Router();
router.post("/deleteB",isAdmin,async function(req, res){
    try {
        const id=req.body.blog_id;
      await  pool.query(`DELETE FROM blogs WHERE id=$1`,[id]);
      res.redirect("/deleteBlog");

    } catch (error) {
        console.error('Error Deleting users:', error);
        res.status(500).send('Server error');
    }
})
module.exports=router;
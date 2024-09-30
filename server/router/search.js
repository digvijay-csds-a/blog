const express=require('express');
const pool=require('../db');
const check=require('../middleware/check');  // Import your middleware

const router=express.Router();
router.get('/search',check,async function(req, res){
    const {title}=req.query;
    try{
        let query,values;
        if(title  &&  title.trim().length>=3){
            query='SELECT * FROM blogs WHERE title ILIKE $1';
            values=[`%${title}%`];
          
        }
        else{
            query='SELECT * FROM blogs';
            values=[];
        }
        const result=await pool.query(query,values);
        res.json(result.rows);
        
    }
    catch(error){
        console.error('Error executing query',error.stack);
        res.status(500).send('Internal  server error');
    }

});
module.exports =router;
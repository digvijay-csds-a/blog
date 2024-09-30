const express=require('express');
const isAdmin = require('../middleware/admin');
const pool=require('../db');
const router=express.Router();
router.post("/deleteR",isAdmin,async function(req, res) {
    try{
    const id=req.body.role_id;
    await pool.query(`DELETE FROM roles WHERE id=$1`,[id]);
    res.redirect("/deleteRole");
}
catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
}
});
module.exports=router;
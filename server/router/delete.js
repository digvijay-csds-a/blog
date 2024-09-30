const express=require('express');
const pool=require('../db');
const isAdmin=require('../middleware/admin');

const router=express.Router();
router.post("/delete",isAdmin,async function(req, res){
try{
    const uid=req.body.user_id;
    console.log(uid);
   await pool.query(`DELETE FROM users WHERE id = $1;
`,[uid]);
    res.redirect("/deleteUser");
}catch(error){
    console.error('Error Deleting users:', error);
        res.status(500).send('Server error');
}
});
module.exports=router;
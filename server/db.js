const Pool=require("pg").Pool;
const pool =new Pool({
    user:"postgres",
    password:"Anita@1234",
    host:"localhost",
    database:"blogify"
});
module.exports=pool;

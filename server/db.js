const Pool=require("pg").Pool;
const pool =new Pool({
    user:"postgress",
    password:"OAdv9cCbNLro8PbkF8MP96zachbfdw0k",
    host:"dpg-crtqia68ii6s73aj1adg-a",
    database:"blogify_xese"
});
module.exports=pool;

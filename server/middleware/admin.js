function isAdmin(req, res, next) {
  if (req.isAuthenticated()&& req.user && req.user.is_admin) {
    return next();
  } else {
    res.redirect('/sign_in'); 
  }
};
module.exports=isAdmin;
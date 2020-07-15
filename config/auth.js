// Function to check if user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // if user is authenticated run next function
    return next();
  }
  res.redirect("/");
}



module.exports = isLoggedIn;
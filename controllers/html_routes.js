const express = require('express');
const router = express.Router();
const moment = require('moment');

// ---------------------------------- //
//        Get LANDING PAGE            //
// ---------------------------------- //
router.get('/', (req, res) => {
  let now = moment().format("dddd, MMMM Do");
  // let now = Date.now();
  // console.log(now)
  res.render('index', { date: now });
});


// ---------------------------------- //
//         Get AUTH PAGE              //
// ---------------------------------- //
router.get('/dashboard', isLoggedIn, (req, res) => {
  console.log(req.user);
  req.session.user = req.user;
  console.log(`****`);
  console.log(req.session);
  // create temp variable to pass to Handlebars View
  let thisUser = {
    id: req.user._id,
    username: req.user.username,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    fullname: req.user.fullname,
  }

  res.render("dashboard", { currentUser: thisUser });
});


//-- Function to check if user is authenticated
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    // if user is authenticated run next function
    return next();
  }
  res.redirect("/users/login");
}


module.exports = router;
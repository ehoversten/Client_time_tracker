const express = require('express');
const router = express.Router();
const moment = require('moment');

const dayjs = require('dayjs');
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
// import { formatDistance, subDays } from "date-fns";

// ---------------------------------- //
//        Get LANDING PAGE            //
// ---------------------------------- //
router.get('/', (req, res) => {
  let now = moment().format("dddd, MMMM Do");
  let today = dayjs().day();
  // let now = Date.now();
  // console.log(now)
  console.log(today);
  res.render('index', { date: now, today: today });
});


// ---------------------------------- //
//         Get AUTH PAGE              //
// ---------------------------------- //
router.get('/dashboard', isLoggedIn, (req, res) => {
  let now = moment().format("dddd, MMMM Do");
 
  let today = dayjs().format("dddd, MMMM, D");
  let day = dayjs().format("LLLL");
  console.log(today);
  // ** TESTING ** //
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

  res.render("dashboard", { currentUser: thisUser, date: now, today: today, day: day });
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
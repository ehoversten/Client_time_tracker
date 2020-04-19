const express = require('express');
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const isLoggedIn = require('../config/auth');

const bcrypt = require('bcryptjs');

const db = require('../models');
const User = require('../models/User');

// ---------------------------------- //
//      Get USER Detail PAGE          //
// ---------------------------------- //
router.get("/overview", isLoggedIn, (req, res) => {
//   console.log(req.session);
//   console.log(req.session.passport);
//   console.log(req.session.passport.user);
//   console.log(req.user);
//   console.log(req.user._id);

  let currentUser = {
      _id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      username: req.user.username,
      department: req.user.department,
      email: req.user.email,
      sessions: req.user.sessions,
      assigned_to: req.user.assigned_to
  }

  res.render("users/overview", { currentUser: currentUser });
});

// ---------------------------------- //
//          Get LOGIN PAGE            //
// ---------------------------------- //
router.get('/login', (req, res) => {
    console.log(req.body);

    res.render('login');
})

// ---------------------------------- //
//          Post LOGIN ROUTE          //
// ---------------------------------- //
router.post('/login', passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/users/login'
}), (req, res) => {
    console.log(req.body);

    res.redirect('/sessions');
});

// ---------------------------------- //
//         Get LOGOUT ROUTE           //
// ---------------------------------- //
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
});

// ---------------------------------- //
//     Get REGISTRATION PAGE          //
// ---------------------------------- //
router.get('/register', (req, res) => {
    // Render Page
    res.render('register');
});

// ---------------------------------- //
//     Post REGISTRATION ROUTE        //
// ---------------------------------- //
router.post('/register', (req, res) => {
    console.log(req.body);
    // create temp obj for user
    let { first_name, last_name, department, username, email, password } = req.body;

    // let newUser = {
    //     first_name: first_name,
    //     last_name: last_name,
    //     department: department,
    //     username: username,
    //     email: email,
    //     password: password
    // }

    // db.User.create(newUser)
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(err => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).json(err);
    //     }
    // })

    // res.redirect('login');


    //-- Mongoose Local Passport (?) -- //
    User.register(new User({
        first_name: first_name,
        last_name: last_name,
        department: department,
        username: username, 
        email: email
    }), password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        console.log(user);
        passport.authenticate("local")(req, res, function() {
            res.redirect('/secret');
        });

    })
    //-- Mongoose Local Passport (?) -- //
    
});


module.exports = router;
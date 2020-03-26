const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const db = require('../models');

// ---------------------------------- //
//          Get LOGIN PAGE            //
// ---------------------------------- //
router.get('/login', (req, res) => {
    console.log(req.body);

    res.render('login');
})

// ---------------------------------- //
//          Post LOGIN PAGE           //
// ---------------------------------- //
router.post('/login', (req, res) => {
    console.log(req.body);

    res.redirect('/sessions');
})


// ---------------------------------- //
//     Get REGISTRATION PAGE          //
// ---------------------------------- //
router.get('/register', (req, res) => {


    res.render('register');
});

// ---------------------------------- //
//     Post REGISTRATION PAGE         //
// ---------------------------------- //
router.post('/register', (req, res) => {
    console.log(req.body);
    // create temp obj for user
    let { first_name, last_name, department, username, email, password } = req.body;

    let newUser = {
        first_name: first_name,
        last_name: last_name,
        department: department,
        username: username,
        email: email,
        password: password
    }

    db.User.create(newUser)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        }
    })

    res.redirect('login');
});


module.exports = router;
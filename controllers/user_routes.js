const express = require('express');
const router = express.Router();

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

    res.redirect('login');
});


module.exports = router;
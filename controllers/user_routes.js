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
//     Get REGISTRATION PAGE         //
// ---------------------------------- //
router.get('/register', (req, res) => {


    res.render('register');
});


router.post('/register', (req, res) => {
    console.log(req.body);

    res.redirect('login');
});


module.exports = router;
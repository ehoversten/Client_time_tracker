const express = require('express');
const router = express.Router();

const db = require('../models');

// ---------------------------------- //
//          Get LOGIN PAGE            //
// ---------------------------------- //
router.get('/login', (req, res) => {
    res.render('login');
})


// ---------------------------------- //
//     Get REGISTRATION PAGE         //
// ---------------------------------- //
router.get('/register', (req, res) => {
    res.send("Register");
})


module.exports = router;
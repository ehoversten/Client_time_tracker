const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/clients', (req, res) => {
    db.Client.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    });
});



module.exports = router;
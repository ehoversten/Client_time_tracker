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

router.post('/client/create', (req, res) => {
    console.log(req.body);
    // Parse data from from submit
    let { client_name, client_contact } = req.body;
    db.Client.create({
      name: client_name,
      contact: client_contact
    }).then(data => {
        console.log(data);
        // res.status(301).json(data);
        res.redirect('/clients');
      })
      .catch(err => {
        res.status(500).json(err);
      });
});


// router.get('/projects', (req, res) => {
//     res.render('projects', {});
// });


router.post('/project/create', (req, res) => {
    console.log(req.body);
    // Parse and deconstruct form submission
    let { project_title, project_desc, client_id } = req.body;

    db.Project.create({
        title: project_title,
        description: project_desc,
        client_id: client_id
    }).then( data => {
        console.log("***********")
        console.log(data);
        let cid = { client_id } = data;
        let filter = { _id : cid };
        // let 
        db.Client.findByIdAndUpdate(
            { _id: cid }, 
            { $push: { projects: cid } },
            // { new: true }
        );
    }).then(data => {
        console.log("------------------")
        // console.log(data);
        // res.json(data);
        res.redirect('/projects');
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
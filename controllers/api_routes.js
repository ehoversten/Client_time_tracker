const express = require('express');
const router = express.Router();

const db = require('../models');

// ---------------------------------- //
//        API Get ALL CLIENTS         //
// ---------------------------------- //
router.get('/clients', (req, res) => {
    db.Client.find({}).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// ---------------------------------- //
//       API Post Create CLIENT       //
// ---------------------------------- //
router.post('/client/create', (req, res) => {
    // console.log(req.body);
    // Parse data from from submit
    let { client_name, client_contact } = req.body;
    db.Client.create({
      name: client_name,
      contact: client_contact
    }).then(data => {
        // console.log(data);
        // res.status(301).json(data);
        res.redirect('/clients');
      })
      .catch(err => {
        res.status(500).json(err);
      });
});

// ---------------------------------- //
//       API Get ALL PROJECTS         //
// ---------------------------------- //
router.get('/projects', (req, res) => {
    db.Project.find({})
        .then(data => {
            res.json(data);
        }).catch(err => {
            if(err) throw err; 
        });
});

// ---------------------------------- //
//       API Post Create PROJECT      //
// ---------------------------------- //
router.post('/project/create', (req, res) => {
    // console.log("Request Body: ")
    // console.log(req.body);
    // Parse and deconstruct form submission
    let { project_title, project_desc, client_id } = req.body;

    db.Project.create({
        title: project_title,
        description: project_desc,
        client_id: client_id
    }).then(data => {
        console.log("***********")
        console.log("New Project Data")
        console.log(data);
        let { _id, client_id } = data;
        console.log(`client id: ${client_id}`);

        db.Client.findByIdAndUpdate(
          { _id: client_id },
          { $push: { projects: _id } },
          { new: true }
          // *** I think I need this, or to use callback here and then trigger res.redirect??
        ).then(dbClient => {
          console.log(dbClient);
          res.status(304).redirect('/projects');
        });
        // catch all error block
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// ---------------------------------- //
//       API Post Create SESSION      //
// ---------------------------------- //
router.post('/session/create', (req, res) => {
    // console.log(req.body);
    // Parse data from from submit
    let { session_notes, proj_id } = req.body;
    db.Session.create({
      date: Date.now(),
      start_time: 1,
      end_time: 25,
      project_id: proj_id,
      notes: session_notes
    })
      .then(data => {
        console.log(data);
        // res.status(301).json(data);
        res.redirect("/sessions");
      })
      .catch(err => {
        res.status(500).json(err);
      });
});


module.exports = router;
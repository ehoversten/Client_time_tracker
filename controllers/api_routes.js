const express = require('express');
// const mongoose = require('mongoose');
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
//       API Edit Create CLIENT       //
// ---------------------------------- //
// router.get('/clients/:id/edit', (req, res) => {
//     console.log("Hit edit API route");
//     console.log(req.params.id);
//     res.send(200).json({ "success": "true" });
// })


// ---------------------------------- //
//       API Get ALL PROJECTS         //
// ---------------------------------- //
router.get('/projects', (req, res) => {
    console.log("Hit Project Route")
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
    console.log("Request Body: ")
    console.log(req.body);
    // Parse and deconstruct form submission
    let { project_title, project_desc, client_id } = req.body;

    // db.Client.findById

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
//       API Delete A Project         //
// ---------------------------------- //
router.delete('/project/:id', (req, res) => {
    let objId = req.params.id
    console.log(objId);

    db.Project.findByIdAndRemove(objId, err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.redirect('/projects');
        }
    });
});

// ---------------------------------- //
//  API Post Create (START) SESSION   //
// ---------------------------------- //
router.post('/session/create', (req, res) => {
    console.log("*** IN CREATE SESSION ***")
    console.log(req.body);
    // Parse data from from submit
    let { proj_id } = req.body;
    db.Session.create({
      date: Date.now(),
      start_time: Date.now(),
      project_id: proj_id,
    })
    .then(data => {
        console.log(data);
        // res.status(301).json(data);
        // res.redirect("/session/end");
        res.redirect("/session/" + data._id + "/edit");
    })
    .catch(err => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

// ---------------------------------- //
//    API Put Update (END) SESSION    //
// ---------------------------------- //
router.put('/session/:id', (req, res) => {

    console.log("**********");
    console.log(req.params);
    console.log(req.body);

    db.Session.findByIdAndUpdate(req.params.id, 
        { 
            end_time: Date.now(), 
            notes: req.body.session_notes 
        })
        .then(updatedSession => {
            console.log(updatedSession);
            res.redirect('/sessions')
        })
        .catch(err => {
            if(err) {
                console.log(err);
                res.status(500).json(err);
            }
        })
})

// ---------------------------------- //
//       API Get ALL SESSIONS         //
// ---------------------------------- //
router.get('/sessions', (req, res) => {
    db.Session.find({})
        .then(data => {
            res.json(data);
        }).catch(err => {
            if(err) throw err; 
        });
});


// ---------------------------------- //
//       API Delete A SESSION         //
// ---------------------------------- //
router.delete('/session/:id', (req, res) => {
    let objId = req.params.id
    console.log(objId);

    db.Session.findOneAndRemove(objId, err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.redirect('/sessions');
        }
    });
});



module.exports = router;
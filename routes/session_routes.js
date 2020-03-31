const express = require("express");
const router = express.Router();

// Bring in our Models
const db = require("../models");


// ---------------------------------- //
//        Get ALL SESSIONS            //
// ---------------------------------- //
router.get('/sessions', isLoggedIn, (req, res) => {
    // Check if user is logged in
  console.log(`Current User: ${req.user}`);
  let currentUser = req.user;
  console.log(`User Name: ${req.user.username}`);


  // create a variable to pass data from CONTROLLER to VIEW
  let allSesh = [];
  db.Session.find({})
    .then(data => {
      // Did we get data? 
      // console.log(data);
      data.forEach(sesh => {
        
        // create a temp variable to parse data from db
        let newSession = {
          _id: sesh._id,
          date: sesh.date,
          start_time: sesh.start_time,
          end_time: sesh.end_time,
          session_length: sesh.end_time - sesh.start_time,
          project_id: sesh.project_id,
          notes: sesh.notes
        }; 
        // add data object to context array
        allSesh.push(newSession); 
      });

      res.render("session", { allSessions: allSesh, currentUser: currentUser });
    })
    .catch(err => {
      if(err) {
        res.status(500).json(err);
      }
    });
})

// ---------------------------------- //
//       Get START NEW SESSION        //
// ---------------------------------- //
router.get('/session/start', isLoggedIn, (req, res) => {

  let projects = [];
  db.Project.find({})
    .then(data => {
      data.forEach(proj => {
        let pjo = {
          _id: proj._id,
          title: proj.title,
          description: proj.description,
          client_id: proj.client_id
        }
        projects.push(pjo);
      });
      res.render('session_start', { allProjects: projects });
    })
    .catch(err => {
      res.status(500).json(err);
    })

});


// ---------------------------------- //
//         Get END SESSION            //
// ---------------------------------- //
router.get('/session/:id/edit', isLoggedIn, (req, res) => {
  // ** TESTING ** //
  console.log(`Req Params: ${req.params.id}`);
  // console.log(req.params);

  // Retrieve currently open session to update
  db.Session.findById(req.params.id, (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    }
    // create temp variable to parse data from database
    let session_time = data.end_time - data.start_time;
    console.log(session_time);

    let foundSession = {
      _id: data._id,
      start_time: data.start_time,
      end_time: data.end_time,
      session_length: session_time,
      project_id: data.project_id,
      notes: data.notes
    };
    console.log(foundSession);
    res.render('session_end', { single: foundSession });
  });
});


module.exports = router;
const express = require("express");
const router = express.Router();

// Bring in our Models
const db = require("../models");
// Bring in Auth Config Function
const isLoggedIn = require("../config/auth");

// ---------------------------------- //
//        Get ALL SESSIONS            //
// ---------------------------------- //
router.get('/', isLoggedIn, (req, res) => {
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
          project_id: sesh.project_work.id,
          notes: sesh.notes,
          session_user: {
            id: sesh.session_user.id,
            username: sesh.session_user.username
          }
        }; 
        console.log('--------------')
        console.log(newSession)
        // add data object to context array
        allSesh.push(newSession); 
      });

      // ** TESTING ** //
      console.log("<><><><><><><>");
      console.log(allSesh);

      res.render("session", { allSessions: allSesh, currentUser: currentUser });
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

// ---------------------------------- //
//       Get START NEW SESSION        //
// ---------------------------------- //
router.get('/start', isLoggedIn, (req, res) => {
  // ** TESTING ** //
  console.log("*** HIT START SESSION ***");
  console.log(`User is ${req.user.username}`);
  //-- Temp OBJ to pass DB data to VIEW
  let projects = [];
  //-- Query Database
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
    });
});

// ---------------------------------- //
//     Post Create (START) SESSION    //
// ---------------------------------- //
router.post('/create', isLoggedIn, (req, res) => {
  // ** TESTING ** //
  console.log("*** IN CREATE SESSION ***")
  console.log(`User is ${req.user.username}`);
  console.log(req.body);

  //-- Parse data from from submit
  let { proj_id, proj_title } = req.body;

  db.Session.create({
    date: Date.now(),
    start_time: Date.now(),
    project_id: proj_id,
    project_work: {
      id: proj_id,
      project_title: proj_title,
    },
    session_user: {
      id: req.user.id,
      username: req.user.username,
    },
  })
    .then((data) => {
      console.log(data);
      // res.status(301).json(data);
      // res.redirect("/session/end");
      res.redirect("/sessions/" + data._id + "/stop");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ---------------------------------- //
//      Put Update (END) SESSION      //
// ---------------------------------- //
router.put('/:id', isLoggedIn, (req, res) => {
  // ** TESTING ** //
  console.log("*** END SESSION ***");
  console.log("**********");
  console.log(req.params);
  console.log(req.body);

  //-- Retrieve Session
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
      console.log(err);
      res.status(500).json(err);
    });
});


// ---------------------------------- //
//         Get END SESSION            //
// ---------------------------------- //
router.get('/:id/stop', isLoggedIn, (req, res) => {
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
      notes: data.notes,
      session_user: {
        id: req.user.id,
        username: req.user.username
      }
    };
    console.log(foundSession);
    res.render('session_end', { single: foundSession });
  });
});

// ---------------------------------- //
//         Get EDIT SESSION           //
// ---------------------------------- //
router.get('/:id/edit', (req, res) => {
  // ** TESTING ** //
  console.log(`Req Params: ${req.params.id}`);
  // console.log(req.params);

  db.Session.findById(req.params.id)
    .then(data => {
      console.log(data);

      // create temp variable to parse data from database
      let session_time = data.end_time - data.start_time;
      // console.log(session_time);

      let foundSession = {
        _id: data._id,
        start_time: data.start_time,
        end_time: data.end_time,
        session_length: session_time,
        project_id: data.project_id,
        notes: data.notes,
        session_user: {
          id: req.user.id,
          username: req.user.username,
        },
      };

      console.log("<><><><><><>");
      console.log(foundSession);
      // res.send("Testing");
      res.render("session_edit", { single: foundSession });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// ---------------------------------- //
//         Delete A SESSION           //
// ---------------------------------- //
router.delete('/:id', (req, res) => {
  let objId = req.params.id
  console.log(objId);

  db.Session.findByIdAndRemove(objId, err => {
    if(err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.redirect('/sessions');
    }
  });
});


module.exports = router;
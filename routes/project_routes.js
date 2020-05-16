const express = require("express");
const router = express.Router();

// Bring in our Models
const db = require("../models");

// Bring in Auth Config Function
const isLoggedIn = require("../config/auth");

// ---------------------------------- //
//        Get ALL PROJECTS            //
// ---------------------------------- //
router.get('/', isLoggedIn, (req, res) => {
  // Create a temp array to parse db data
  let clients = [];
  // Find all clients to populate pull-down 
  db.Client.find({})
    .then(data => {
      // Loop through db data to parse for view context
      data.forEach(client => {
        let clientObj = {
          _id: client._id,
          name: client.name,
          contact: client.contact
        };
        clients.push(clientObj);
        // console.log(clients);
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
  // Create a temp array to parse db data
  let projects = [];
  db.Project.find({})
    .populate('Client')
    .then(data => {
      data.forEach(proj => {
        // create temp object to parse data for handlebars security
        let newProj = {
            _id: proj._id,
            title: proj.title,
            description: proj.description,
            client_id: proj.client_id
        }

        projects.push(newProj);
      });
      // Render page, pass our parsed data as context to view page
      res.render('projects', { allProjects: projects, allClients: clients });
    }).catch(err => {
      // return error
      res.status(500).json(err);
    });
});

// ---------------------------------- //
//        Post Create PROJECT         //
// ---------------------------------- //
router.post('/create', isLoggedIn, (req, res) => {
    console.log("Request Body: ")
    console.log(req.body);
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
//      GET Project Detail View       //
// ---------------------------------- //
router.get('/:id', isLoggedIn, (req, res) => {
  console.log(req.params.id);

  // Find Single Project 
  db.Project.findById({ _id: req.params.id})
    .then(data => {
      console.log("Found Item");
      // -- TESTING -- //
      // console.log(typeof data);
      // console.log(data);
      
      // Create a Temp variable by CLONING the returned DB data OBJECT
      let proj = JSON.parse(JSON.stringify(data));
      // -- TESTING -- //
      // console.log("~~~~~~~~~~");
      // console.log(proj);

      res.render('detail', { detail: proj })
    }).catch(err => {
      console.log(err);
    });

})


// ---------------------------------- //
//          Delete A Project          //
// ---------------------------------- //
router.delete('/:id', isLoggedIn, (req, res) => {
    let objId = req.params.id
    console.log(objId);

    db.Project.findOneAndRemove({ _id: objId }, err => {
        if(err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            res.redirect('/projects');
        }
    });
});


module.exports = router;
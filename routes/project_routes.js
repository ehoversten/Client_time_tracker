const express = require("express");
const router = express.Router();

// Bring in our Models
const db = require("../models");


// ---------------------------------- //
//        Get ALL PROJECTS            //
// ---------------------------------- //
router.get('/projects', isLoggedIn, (req, res) => {
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


module.exports = router;
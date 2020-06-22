const express = require('express');
const router = express.Router();

// Bring in our Models
const db = require("../models");
// Bring in Auth Config Function
const isLoggedIn = require("../config/auth");

// ---------------------------------- //
//        Get ALL CLIENTS             //
// ---------------------------------- //
router.get('/', isLoggedIn, (req, res) => {
  // create array to pass our parsed database data
  let clients = [];

  db.Client.find({})
    .populate("projects")
    .then(data => {
      // console.log(data);
      data.forEach(client => {
        // create array to pass our parsed database data
        let project_data = [];

        // create array to parse associated Project data
        let client_projects = client.projects;

        client_projects.forEach(item => {
            // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
            let proj = {
                _id: item._id,
                title: item.title,
                description: item.description,
                client_id: item.client_id
            }
            // Add each parse Project Object to our project_data Array
            project_data.push(proj);
        })

        // *** TESTING *** //
        // console.log("Project data:")
        // console.log(typeof project_data)
        // console.log(project_data)

        // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
        let client_obj = {
            _id: client._id,
            name: client.name,
            contact: client.contact,
            projects: project_data
        }
        // Add each parse CLient Object to our clients Array
        clients.push(client_obj);
      });

      // *** TESTING *** //
      // console.log("********")
      // console.log(clients);
      // console.log("//****//")
      // console.log(`Projects Array : ${projectsArr}`);

      // Render page, pass our parsed array data to the view
      res.render('clients', { allClients: clients });
    }).catch(err => {
      // console.log(err);
      res.status(500).json(err);
  });
});


// ---------------------------------- //
//         Post Create CLIENT         //
// ---------------------------------- //
router.post('/create', (req, res) => {
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
//           Edit A Client            //
// ---------------------------------- //
router.get('/:id/edit', (req, res) => {
  console.log("Hit edit route");
  let client_id = req.params.id;

  console.log(client_id);
  res.status(200).send("Edit Route");
})

// ---------------------------------- //
//         Delete A Client            //
// ---------------------------------- //
router.delete('/:id', (req, res) => {
  let objId = req.params.id
  console.log(`Object ID: ${objId}`);

  db.Client.findOneAndRemove( { _id: objId }, err => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.redirect('/clients');
    }
  });
});


module.exports = router;
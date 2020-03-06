const express = require('express');
const router = express.Router();

const db = require('../models');


// ---------------------------------- //
//        Get LANDING PAGE            //
// ---------------------------------- //
router.get('/', (req, res) => {
    res.render('index');
});

// ---------------------------------- //
//        Get ALL CLIENTS             //
// ---------------------------------- //
router.get('/clients', (req, res) => {
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
//        Get ALL PROJECTS            //
// ---------------------------------- //
router.get('/projects', (req, res) => {
    let projects = [];
    let clients = [];
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
            res.render('projects', { allProjects: projects });
        }).catch(err => {
            // return error
            res.status(500).json(err);
        })
})


// ---------------------------------- //
//        Get ALL SESSIONS            //
// ---------------------------------- //
router.get('/sessions', (req, res) => {
  // create a variable to pass data from CONTROLLER to VIEW
  let allSesh = db.Session.find({})
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      if(err) {
        res.status(500).json(err);
      }
    });
})



// ---------------------------------- //
//      // *** TESTING **** //        //
// ---------------------------------- //
router.get('/testing', (req, res) => {
    let testData = [
      {
        _id: 0,
        name: "Tom",
        age: 52,
        friends: [
          {
            _id: 2,
            name: "Anne",
            age: 12
          },
          {
            _id: 1,
            name: "Monica",
            age: 24
          }
        ]
      },
      {
        _id: 1,
        name: "Monica",
        age: 24
      },
      {
        _id: 2,
        name: "Anne",
        age: 12
      },
      {
        _id: 3,
        name: "Bill",
        age: 9,
        friends: [
          {
            _id: 2,
            name: "Anne",
            age: 12
          },
          {
            _id: 1,
            name: "Monica",
            age: 24
          }
        ]
      }
    ];

    let user = {
        username: "bingo",
        company: {
            title: "Ford Motor Company",
            address: "1212 Michigan Ave"
        },
        title: "developer"
    }

    res.render("testing", { td: testData, userdata: user });
});


module.exports = router;
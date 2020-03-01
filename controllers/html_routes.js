const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/', (req, res) => {
    res.render('index');
});

// Get All Clients
router.get('/clients', (req, res) => {
    // array to pass our database data to our view
    let clients = [];
    let projectsArr = [];
    db.Client.find({})
        .populate("projects")
        .then(data => {
            console.log(data);
            data.forEach(client => {
                // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
                let client_obj = {
                    _id: client._id,
                    name: client.name,
                    contact: client.contact,
                    projects: client.projects
                }
                clients.push(client_obj);
                projectsArr.push(client_obj.projects);
            });
            console.log("********")
            console.log(clients);
            console.log("//****//")
            console.log(projectsArr);
            res.render('clients', { allClients: clients, client_projects: projectsArr });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});


// get all projects
router.get('/projects', (req, res) => {
    let projects = [];
    let clients = [];
    db.Project.find({})
        .populate('Client')
        .then(data => {
        data.forEach(proj => {
            let newProj = {
                _id: proj._id,
                title: proj.title,
                description: proj.description,
                client_id: proj.client_id
            }

            projects.push(newProj);
        });
        res.render('projects', { allProjects: projects });
    }).catch(err => {
        res.status(500).json(err);
    })
})



module.exports = router;
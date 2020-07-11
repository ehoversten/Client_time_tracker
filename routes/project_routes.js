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

  // --------------------------------------- //

  // Create a temp array to parse db data
  let projects = [];
  db.Project.find({})
    .populate('Client', ['name', 'contact'])
    // .exec((err, result) => {
    //   console.log("------------");
    //   console.log(result);
    //   return result;
    // })
    .then(data => {
      console.log("**********");
      console.log(data);

      data.forEach(proj => {
        // create temp object to parse data for handlebars security
        let newProj = {
            _id: proj._id,
            title: proj.title,
            description: proj.description,
            client_id: proj.client_id,
            client_name: proj.name,
            client_contact: proj.contact
        }

        // ** TESTING ** //
        console.log("*^*^*^*^*^*^");
        console.log(newProj);

        projects.push(newProj);
      });
      // Render page, pass our parsed data as context to view page
      res.render('projects', { allProjects: projects, allClients: clients });

      // ** TESTING ** //
      // res.status(200).json(data);
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
router.get('/:id', isLoggedIn, async (req, res) => {
  console.log(req.params.id);

  // --------------------------------------- //

  // Create Temp Obj for Project
  let proj_sessions = [];

  await db.Session.find({})
    .populate('User')
    .populate('Project')
    .then(data => {
      // console.log(data);
      data.map(session => {
        let newSession = {
          _id: session._id,
          date: session.date,
          start_time: session.start_time,
          end_time: session.end_time,
          project_work: session.project_work,
          project_id: session.project_id,
          notes: session.notes,
          session_user: session.session_user
        }

        // IF id matches add to proj_sessions variable
        if(newSession.project_id == req.params.id) {
          // console.log("Found Match");
          proj_sessions.push(newSession);
        }
      });
      // ** TESTING ** //
      console.log("Project Sessions loaded");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });


  // --------------------------------------- //

  // Create Temp Obj for Project
  let proj;

  // Find Single Project 
  await db.Project.findById({ _id: req.params.id})
    .then(data => {
      console.log("Found Item");
      // -- TESTING -- //
      // console.log(typeof data);
      // console.log(data);
      
      // Create/Update/Assign a Temp variable by CLONING the returned DB data OBJECT
      proj = JSON.parse(JSON.stringify(data));
      // -- TESTING -- //
      // console.log("~~~~~~~~~~");
      // console.log(proj);

      // res.render('detail', { detail: proj, detail_sessions: proj_sessions })
    }).catch(err => {
      console.log(err);
    });

    res.render("detail", {
      detail: proj,
      detail_sessions: proj_sessions
    });
});

// ---------------------------------- //
//          Edit A Project            //
// ---------------------------------- //
router.get('/:id/edit', async (req, res) => {
  // console.log(req.params.id);
  let clients = [];
  let project_clients, this_proj;

  // Find all clients to populate pull down
  try {
    project_clients = await db.Client.find({});
    project_clients.map( client => {
      let cli = {
        _id: client._id,
        name: client.name,
        contact: client.contact
      }
      clients.push(cli);
    }); 

     // ** TESTING ** //
    console.log("<*><*><*><*><*><*><*>");
    console.log(clients);
    
    this_proj = await db.Project.findById(req.params.id);
    let proj = {
      _id: this_proj._id,
      title: this_proj.title,
      description: this_proj.description,
      client_id: this_proj.client_id,
      team_members: this_proj.team_members,
      all_sessions: this_proj.all_sessions,
      sessions: this_proj.sessions,
      created_at: this_proj.created_at,
      start_date: this_proj.start_date,
      completion_date: this_proj.completion_date,
    };
    console.log("<#><#><#><#><#><#><#>");
    console.log(proj);

    res.render("project_edit", {
      proj: proj,
      allClients: clients,
    });

  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }

  // let project_clients = await db.Client.find({})
  //   .then(data => {
  //     data.forEach( item => {
  //       let cli = {
  //         _id: item._id,
  //         name: item.name,
  //       }
  //       clients.push(cli);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  
  // ** TESTING ** //
  // console.log("<*><*><*><*><*><*><*>");
  // console.log(project_clients);

  // Retrieve Project from DB
  // let this_proj = await db.Project.findById(req.params.id)
  //   .then(data => {
  //     let item = {
  //       _id: data._id,
  //       title: data.title,
  //       description: data.description,
  //       client_id: data.client_id,
  //       team_members: data.team_members,
  //       all_sessions: data.all_sessions,
  //       sessions: data.sessions,
  //       created_at: data.created_at,
  //       start_date: data.start_date,
  //       completion_date: data.completion_date,
  //     };
  //   })
  //   .catch(err => {
  //     res.status(500).json(err);
  //   });

  // ** TESTING ** //
  // console.log("<*><*><*><*><*><*><*>");
  // console.log(this_proj);
  
  // Render Edit Page
  // res.render('project_edit', { proj: item, allClients: clients })

  // res.render("project_edit", { 
  //   proj: this_proj,
  //   allClients: project_clients 
  // });

});

// ---------------------------------- //
//          Update A Project          //
// ---------------------------------- //
router.put('/:id', (req, res) => {
  // console.log("Saving Project Edit");
  // console.log(req.params.id);
  // console.log(req.body);

  let update = {
    title: req.body.project_title,
    description: req.body.project_desc,
    client_id: req.body.client_id,
  };

  console.log("*******");
  console.log(update)

  db.Project.findByIdAndUpdate(req.params.id, update, { new: true }, (err, data) => {
    if(err) {
      res.status(500).json(err);
    }
    console.log("Record Updated");
    console.log(data);
    res.redirect("/projects");
  })
});


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
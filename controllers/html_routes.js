const express = require('express');
const router = express.Router();

// ---------------------------------- //
//        Get LANDING PAGE            //
// ---------------------------------- //
router.get('/', (req, res) => {
  // let now = moment().format("dddd, MMMM Do");
  let now = Date.now();
  console.log(now)
  res.render('index', { date: now });
});

// ---------------------------------- //
//        Get ALL CLIENTS             //
// ---------------------------------- //
// router.get('/clients', isLoggedIn, (req, res) => {
//   // create array to pass our parsed database data
//   let clients = [];

//   db.Client.find({})
//     .populate("projects")
//     .then(data => {
//       // console.log(data);
//       data.forEach(client => {
//         // create array to pass our parsed database data
//         let project_data = [];

//         // create array to parse associated Project data
//         let client_projects = client.projects;

//         client_projects.forEach(item => {
//             // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
//             let proj = {
//                 _id: item._id,
//                 title: item.title,
//                 description: item.description,
//                 client_id: item.client_id
//             }
//             // Add each parse Project Object to our project_data Array
//             project_data.push(proj);
//         })

//         // *** TESTING *** //
//         // console.log("Project data:")
//         // console.log(typeof project_data)
//         // console.log(project_data)

//         // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
//         let client_obj = {
//             _id: client._id,
//             name: client.name,
//             contact: client.contact,
//             projects: project_data
//         }
//         // Add each parse CLient Object to our clients Array
//         clients.push(client_obj);
//       });

//       // *** TESTING *** //
//       // console.log("********")
//       // console.log(clients);
//       // console.log("//****//")
//       // console.log(`Projects Array : ${projectsArr}`);

//       // Render page, pass our parsed array data to the view
//       res.render('clients', { allClients: clients });
//     }).catch(err => {
//       // console.log(err);
//       res.status(500).json(err);
//   });
// });

// // ---------------------------------- //
// //        Get ALL PROJECTS            //
// // ---------------------------------- //
// router.get('/projects', isLoggedIn, (req, res) => {
//   let clients = [];
//   // Find all clients to populate pull-down 
//   db.Client.find({})
//     .then(data => {
//       // Loop through db data to parse for view context
//       data.forEach(client => {
//         let clientObj = {
//           _id: client._id,
//           name: client.name,
//           contact: client.contact
//         };
//         clients.push(clientObj);
//         // console.log(clients);
//       })
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
  
  
//   let projects = [];
//   db.Project.find({})
//     .populate('Client')
//     .then(data => {
//       data.forEach(proj => {
//         // create temp object to parse data for handlebars security
//         let newProj = {
//             _id: proj._id,
//             title: proj.title,
//             description: proj.description,
//             client_id: proj.client_id
//         }

//         projects.push(newProj);
//       });
//       // Render page, pass our parsed data as context to view page
//       res.render('projects', { allProjects: projects, allClients: clients });
//     }).catch(err => {
//       // return error
//       res.status(500).json(err);
//     })
// })


// // ---------------------------------- //
// //        Get ALL SESSIONS            //
// // ---------------------------------- //
// router.get('/sessions', isLoggedIn, (req, res) => {
//     // Check if user is logged in
//   console.log(`Current User: ${req.user}`);
//   let currentUser = req.user;
//   console.log(`User Name: ${req.user.username}`);


//   // create a variable to pass data from CONTROLLER to VIEW
//   let allSesh = [];
//   db.Session.find({})
//     .then(data => {
//       // Did we get data? 
//       // console.log(data);
//       data.forEach(sesh => {
        
//         // create a temp variable to parse data from db
//         let newSession = {
//           _id: sesh._id,
//           date: sesh.date,
//           start_time: sesh.start_time,
//           end_time: sesh.end_time,
//           session_length: sesh.end_time - sesh.start_time,
//           project_id: sesh.project_id,
//           notes: sesh.notes
//         }; 
//         // add data object to context array
//         allSesh.push(newSession); 
//       });

//       res.render("session", { allSessions: allSesh, currentUser: currentUser });
//     })
//     .catch(err => {
//       if(err) {
//         res.status(500).json(err);
//       }
//     });
// })

// // ---------------------------------- //
// //       Get START NEW SESSION        //
// // ---------------------------------- //
// router.get('/session/start', isLoggedIn, (req, res) => {

//   let projects = [];
//   db.Project.find({})
//     .then(data => {
//       data.forEach(proj => {
//         let pjo = {
//           _id: proj._id,
//           title: proj.title,
//           description: proj.description,
//           client_id: proj.client_id
//         }
//         projects.push(pjo);
//       });
//       res.render('session_start', { allProjects: projects });
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     })

// });


// // ---------------------------------- //
// //         Get END SESSION            //
// // ---------------------------------- //
// router.get('/session/:id/edit', isLoggedIn, (req, res) => {
//   // ** TESTING ** //
//   console.log(`Req Params: ${req.params.id}`);
//   // console.log(req.params);

//   // Retrieve currently open session to update
//   db.Session.findById(req.params.id, (err, data) => {
//     if(err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//     // create temp variable to parse data from database
//     let session_time = data.end_time - data.start_time;
//     console.log(session_time);

//     let foundSession = {
//       _id: data._id,
//       start_time: data.start_time,
//       end_time: data.end_time,
//       session_length: session_time,
//       project_id: data.project_id,
//       notes: data.notes
//     };
//     console.log(foundSession);
//     res.render('session_end', { single: foundSession });
//   });
// });


// ---------------------------------- //
//         Get AUTH PAGE              //
// ---------------------------------- //
router.get('/secret', isLoggedIn, (req, res) => {
  res.render('secret');
});


// Function to check if user is authenticated
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    // if user is authenticated run next function
    return next();
  }
  res.redirect("/users/login");
}

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
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
    // .populate({
    //   path: 'projects',
    //   select: 'title description'
    // })
    .populate('clients_projects')
    .then(data => {

      //-- LOGGING --//
      console.log("*/*/*/*/*/*/*/*/*/*`");
      // console.log(data);

      data.forEach(client => {
        // ** TESTING ** //
        // console.log('(*)(*)(*)(*)(*)(*)(*)');
        // console.log(client);

        // ** REMOVE SECTION ?? ** //
/*        
        // create array to pass our parsed database data
        let project_data = [];

        // create array to parse associated Project data
        let client_projects = client.projects;

        client_projects.forEach((item) => {
          // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
          let proj = {
            _id: item._id,
            title: item.title,
            description: item.description,
            // client_id: item.client_id,
            // client_name: item.client_id.name,
            // client_primary: item.client_id.primary,
            // client_secondary: item.client_id.secondary
          };
          // Add each parse Project Object to our project_data Array
          project_data.push(proj);
        });
*/
        // ^^ REMOVE SECTION ?? ^^ //

        //-- Populates the Virtual 'clients_projects' Record --//
        let projects_results = [];
        client.clients_projects.map((proj) => {
          // console.log(proj);
          let temp = {
            _id: proj._id,
            title: proj.title,
            desc: proj.description,
          };
          projects_results.push(temp);
        });

        // *** TESTING *** //
        // console.log("Project data:")
        // console.log(typeof project_data)
        // console.log(project_data)

        // create a temp object to push into our array, this way we avoid a security issue with mongoose and handlebars
        let client_obj = {
          _id: client._id,
          name: client.name,
          contact: client.contact,
          primary: client.primary,
          secondary: client.secondary,
          // projects: project_data,
          all_projects: projects_results,
        };
        // Add each parse CLient Object to our clients Array
        clients.push(client_obj);
      });

      // *** TESTING *** //
      // console.log("********")
      // console.log(clients);
      // console.log("//****//")
      // console.log(`Projects Array : ${projectsArr}`);

      // Render page, pass our parsed array data to the view
      res.render('clients/clients', { allClients: clients });

      // ** TESTING ** //
      // res.status(200).json(clients);
    }).catch(err => {
      // console.log(err);
      res.status(500).json(err);
  });
});


// ---------------------------------- //
//          Get CLIENT Detail         //
// ---------------------------------- //
router.get('/:id', isLoggedIn, (req, res) => {
  db.Client.findById(req.params.id)
    .populate('projects')
    .then(client => {
      console.log(client);

      // create array for associated client projects
      let client_projs = [];
      client.projects.map(proj => {
        client_projs.push(proj);
      });
      console.log("Associated Projects: ", client_projs);
      
      // create temp OBJ for client
      let client_obj = {
        _id: client._id,
        name: client.name,
        contact: client.contact,
        primary: client.primary,
        secondary: client.secondary,
        // projects: client_projs
      }

      console.log("Found Client: ", client_obj);

      res.status(200).render("clients/client_detail", { item: client_obj, client_proj: client_projs });
    })
    .catch(err => {
      console.log(err);
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
router.get('/:id/edit', isLoggedIn, (req, res) => {
  let client_id = req.params.id;
  // console.log(client_id);

  // Find Client in DB
  db.Client.findById(client_id).then(data => {
    console.log("Found Client: ", data);

    let cli = {
      _id: data._id,
      name: data.name,
      primary: data.primary,
      secondary: data.secondary,
    }

    // ** TESTING ** //
    console.log("Sending Client: ", cli);

    res.render('clients/client_edit', { item: cli });
  }).catch(err => {
    res.status(500).json(err);
  })
});

// ---------------------------------- //
//         Update A Client            //
// ---------------------------------- //
router.put('/:id', isLoggedIn, (req, res) => {
  console.log(req.params.id);

  let update = {
    // _id: req.params.id,
    name: req.body.client_name,
    primary: req.body.primary_contact,
    secondary: req.body.secondary_contact,
  };

  // ** TESTING ** //
  console.log("Update Client: ", update);

  // -- Update Record -- //
  db.Client.findByIdAndUpdate(
    req.params.id,
    update,
    { new: true },
    (err, updatedClient) => {
      if (err) {
        console.log(err);
        res.status(500).redirect("/clients");
      }
      console.log("Record Updated ...");
      console.log(updatedClient);
      res.status(203).redirect("/clients");
    }
  );
});

// ---------------------------------- //
//         Delete A Client            //
// ---------------------------------- //
router.delete('/:id', isLoggedIn, (req, res) => {
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

// router.delete("/:id", checkCampgroundOwnership, (req, res) => {
//   Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
//     if (err) {
//       console.log(err);
//     }
//     Comment.deleteMany({ _id: { $in: campgroundRemoved.comments } }, (err) => {
//       if (err) {
//         console.log(err);
//       }
//       res.redirect("/campgrounds");
//     });
//   });
// });

// Delete/destroy Campground (with PRE HOOK in Model Definition)
// router.delete("/:id",async(req, res) => {
//   try {
//     let foundCampground = await Campground.findById(req.params.id);
//     await foundCampground.remove();
//     res.redirect("/campgrounds");
//   } catch (error) {
//     console.log(error.message);
//     res.redirect("/campgrounds");
//   }
// });


module.exports = router;
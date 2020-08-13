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
    .populate({
      path: 'projects',
      // select: 'title description'
    })
    .then(data => {

      //-- LOGGING --//
      // console.log("*/*/*/*/*/*/*/*/*/*`");
      // console.log(data);


      data.forEach(client => {

        // console.log('(*)(*)(*)(*)(*)(*)(*)');
        // console.log(client);
        
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
                client_id: item.client_id,
                client_name: item.client_id.name,
                client_primary: item.client_id.primary,
                client_secondary: item.client_id.secondary
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
            primary: client.primary,
            secondary: client.secondary,
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

      // ** TESTING ** //
      // res.status(200).json(clients);
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
  let client_id = req.params.id;
  // console.log(client_id);

  // Find Client in DB
  db.Client.findById(client_id).then(data => {
    // console.log("Found :")
    // console.log(data);

    let cli = {
      _id: data._id,
      name: data.name,
      contact: data.contact,
    }
    res.render('client_edit', { item: cli });
  }).catch(err => {
    res.status(500).json(err);
  })
});

// ---------------------------------- //
//         Update A Client            //
// ---------------------------------- //
router.put('/:id', (req, res) => {
  let update = {
    // _id: req.body._id,
    name: req.body.client_name,
    contact: req.body.client_contact
  }
  
  console.log(req.params.id);
  // -- Update Record -- //
  db.Client.findByIdAndUpdate(req.params.id, update, { new: true }, (err, updatedClient) => {
    if(err) {
      console.log(err);
      res.status(500).redirect('/clients')
    }
    console.log("Record Updated ...");
    console.log(updatedClient);
    res.status(203).redirect('/clients');
  })
  
});

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
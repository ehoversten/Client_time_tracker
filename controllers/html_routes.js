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
//         Get AUTH PAGE              //
// ---------------------------------- //
router.get('/secret', isLoggedIn, (req, res) => {
  console.log(req.user);
  req.session.user = req.user;
  console.log(`****`);
  console.log(req.session);
  // create temp variable to pass to Handlebars View
  let thisUser = {
    id: req.user._id,
    username: req.user.username,
    first_name: req.user.first_name
  }

  res.render("secret", { currentUser: thisUser });
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
//      // *** D3 TESTING **** //     //
// ---------------------------------- //
const d3 = require('d3');

router.get('/d3', (req, res) => {

  let test_arr = [1, 2, 3, 4, 5];

  res.render('d3_playground', { test_d3: test_arr })
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
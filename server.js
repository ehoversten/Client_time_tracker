const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const logger = require("morgan");
const methodOverride = require('method-override');
const moment = require("helper-moment");
const handlebars = require("handlebars");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require("passport-local-mongoose");


// Bring in Routes
const client_routes = require('./routes/client_routes');
const project_routes = require('./routes/project_routes');
const session_routes = require('./routes/session_routes');

// const api_routes = require('./controllers/api_routes');
const html_routes = require('./controllers/html_routes');
const user_routes = require('./controllers/user_routes');

const PORT = process.env.PORT || 3000;

// Connect to Database 
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/project_tracker_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

// Make Mongoose attach virtuals whenever calling `JSON.stringify()`,
// including using `res.json()`
mongoose.set('toJSON', { virtuals: true });

// -------------------------------------------- //
// Connect to Database through Docker Container //
// -------------------------------------------- //
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://mongo:27017/docker-node-mongo",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   }
// ).then( res => console.log(res)
// ).catch(err => console.log(err)
// );
// ------ SAVE ABOVE FOR LATER DEPLOYMENT ------- //

// Bring in our Models
const db = require("./models");

// const seedDB = require('./seeds');

// Initialize an express instance
const app = express();

// middleware to serve up our static files
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

handlebars.registerHelper("moment", require("helper-moment"));

// Express-Session Middleware
app.use(
  require("express-session")({
    secret: "typeythings",
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  })
);

// PassportJS Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
})

// Morgen Logger Middleware
app.use(logger("dev"));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
// --> Define Routes
app.use('/', html_routes);
app.use('/clients', client_routes);
app.use('/projects', project_routes);
app.use('/sessions', session_routes);
app.use('/users', user_routes);


// --> Connect Server
app.listen(PORT, () => {
    console.log(moment());
    console.log(`Server listening on port: ${PORT}`);
});


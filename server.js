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
const api_routes = require('./controllers/api_routes');
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

// Bring in our Models
const db = require("./models");

const seedDB = require('./seeds');


// Initialize an express instance
const app = express();

// middleware to serve up our static files
app.use(express.static("public"));

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

app.use(logger("dev"));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 


// -- ROUTES -- //
// app.get('/', (req, res) => {
//     // res.send("Hi There");
//     res.render('index');
// });


app.use('/', html_routes);
app.use('/api', api_routes);
app.use('/users', user_routes);


app.listen(PORT, () => {
    console.log(moment());
    console.log(`Server listening on port: ${PORT}`);
});


const express = require('express');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const logger = require("morgan");
const api_routes = require('./controllers/api_routes');
const html_routes = require('./controllers/html_routes');

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


// Initialize an express instance
const app = express();

// middleware to serve up our static files
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 

// *** TESTING *** //

// db.Client.create({
//         name: "Capital Music",
//         contact: "Carol King"
//     }).then(data => {
//         console.log(data);
//     }).catch(({ message }) => {
//         console.log(message);
//     });



// -- ROUTES -- //
// app.get('/', (req, res) => {
//     // res.send("Hi There");
//     res.render('index');
// });


app.use('/', html_routes);
app.use('/api', api_routes);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


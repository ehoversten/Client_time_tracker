const express = require('express');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Connect to Database 
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project_tracker_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Initialize an express instance
const app = express();

// middleware to serve up our static files
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 


// -- ROUTES -- //
app.get('/', (req, res) => {
    // res.send("Hi There");
    res.render('index');
})


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


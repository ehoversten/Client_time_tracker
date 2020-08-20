const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const db = require("./models");
const { dirname } = require("path");

//-- Connect to Database
mongoose.connect("mongodb://localhost/project_tracker_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//-- Load environment variables
// dotenv.config({ path: './config/config.env'});

// //-- Atlas DB --//
// const connectDB = require('./config/db');
// connectDB();

//-- Read JSON file
const clients = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/clients.json`, "utf-8")
);
const projects = JSON.parse(fs.readFileSync(`${__dirname}/_data/projects.json`, 'utf-8'));
// const sessions = JSON.parse(fs.readFileSync(`${__dirname}/_data/sessions.json`, 'utf-8'));

// console.log(clients);

//-- Import Data
const importData = async () => {
  try {
    await db.Client.create(clients);
    console.log("Client Data Imported ...");
    await db.Project.create(projects);
    console.log("Project Data Imported ...");
    // await db.Session.create(sessions);

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//-- Remove Data
const deleteData = async () => {
  try {
    await db.Client.deleteMany();
    console.log("Client Data Removed ...");
    await db.Project.deleteMany();
    console.log("Project Data Removed ...");
    await db.Session.deleteMany();
    console.log("Session Data Removed ...");

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}

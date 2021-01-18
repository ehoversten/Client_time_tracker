const fs = require('fs');
const mongoose = require("mongoose");
const db = require("../models");
const { dirname } = require('path');

//-- Connect to Database
mongoose.connect("mongodb://localhost/project_tracker_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


//-- Data
let clientSeed = [
  {
    name: "Client 1",
    contact: "Garfield",
    primary: "Garfield",
    secondary: "Ode",
    projects: [],
  },
  {
    name: "Client 2",
    contact: "Batman",
    primary: "Batman",
    secondary: "Robin",
    projects: [],
  },
  {
    name: "Client 3",
    contact: "Jack",
    primary: "Jack",
    secondary: "Diane",
    projects: [],
  },
  {
    name: "Client 4",
    contact: "Mario",
    primary: "Mario",
    secondary: "Luigi",
    projects: [],
  },
];



// db.Client.deleteMany({})
//   .then(() => db.Client.collection.insertMany(clientSeed))
//   .then((data) => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });


let projectSeed =  [
    {
      title: "Project 1",
      description: "Project description A",
      client_id: "5f332c53c01e5c2de7e8e0c5",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 2",
      description: "Project description B",
      client_id: "5f332c53c01e5c2de7e8e0c5",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 3",
      description: "Project description C",
      client_id: "5f332c53c01e5c2de7e8e0c6",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 4",
      description: "Project description D",
      client_id: "5f332c53c01e5c2de7e8e0c6",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 5",
      description: "Project description E",
      client_id: "5f332c53c01e5c2de7e8e0c7",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 6",
      description: "Project description F",
      client_id: "5f332c53c01e5c2de7e8e0c7",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 7",
      description: "Project description G",
      client_id: "5f332c53c01e5c2de7e8e0c8",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
    {
      title: "Project 8",
      description: "Project description H",
      client_id: "5f332c53c01e5c2de7e8e0c8",
      proj_sessions: [],
      start_date: Date.now(),
      completion_date: null,
    },
  ];


  db.Project.deleteMany({})
    .then(() => db.Project.collection.insertMany(projectSeed))
    .then((data) => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
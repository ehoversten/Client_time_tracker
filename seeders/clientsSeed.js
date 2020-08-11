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


//-- Read JSON file
const clients = JSON.parse(fs.readFileSync(`${__dirname}/_data/clients.json`, 'utf-8'));

console.log(clients);

//-- Import Data
const importData = async () => {
    try {
        await db.Client.create(clients);

        console.log("Client Data Imported ...");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

//-- Remove Data
const deleteData = async () => {
    try {
        await db.Client.deleteMany()

        console.log("Client Data Removed ...");
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if(process.argv[2] == '-i') {
    importData();
} else if(process.argv[2] == '-d') {
    deleteData();
}


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
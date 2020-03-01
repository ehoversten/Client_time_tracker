const mongoose = require('mongoose');
const db = require('./models');

// Seed Dataset 
let data = [
  {
    name: "AMC Music",
    contact: "Bonnie Rait"
  },
  {
    name: "BEW Design",
    contact: "Sue Stacy"
  },
  {
    name: "Boggle Mind",
    contact: "Drew Pickles",
  }
];

function seedDB() {
    
    // Remove All Clients Collection/Table
    db.Client.remove({}, err => {
        if(err) {
            throw err;
        }
        console.log("removed Clients...");
        // Add some test clients
        data.forEach(seed => {
            db.Client.create(seed, (err, clientData) => {
                if(err) {
                    console.log(err);
                }
                console.log(`client added: ${clientData}`);
                db.Project.create({
                    title: "Test Assessment",
                    description: "Quality assurance and functionality testing",
                    client_id: clientData._id
                }, (err, projData) => {
                    if(err) {
                        console.log(err);
                    }
                    clientData.projects.push(projData);
                    clientData.save();
                    console.log("created new project...")
                });
            });
        });
    });


    // Remove Project Collection/Table
    // db.Project.remove({}, err => {
    //     if(err) {
    //         throw err;
    //     }
    //     console.log("removed Clients...");
    // });
    
    
    
    // Remove Session Collection/Table
    // db.Session.remove({}, err => {
    //     if(err) {
    //         throw err;
    //     }
    //     console.log("removed Clients...");
    // });

}

// make function available outside of file
module.exports = seedDB;
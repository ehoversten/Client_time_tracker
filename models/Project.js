const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//-- Bring in Client Model
const Client = require('./Client');

const ProjectSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please enter a title"]
    },
    description: {
        type: String,
        required: true
    },
    //-- Playing With Embedding vs. Referencing Associated Data --//
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    // client_obj: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Client'
    //     }
    // ],
    // proj_client: {
    //     id: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Client'
    //     },
    //     client_name: { type: String },
    //     client_contact: { type: String }
    // },
    // team_members : [    
    //     {
    //         id : {
    //             type: Schema.Types.ObjectId,
    //             ref: 'User'
    //         }, 
    //         username: {
    //             type: String
    //         }
    //     }
    // ],

    // -- TESTING -- //
    // all_sessions : [
    //     {
    //         id: { 
    //             type: Schema.Types.ObjectId,
    //             ref: 'Session'
    //         }
    //     }
    // ],

    // --> Which one is correct or better (?)
    proj_sessions : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Session'
        }
    ],
    // ^^ TESTING ^^ //

    created_at: {
        type: Date,
        default: Date.now
    },
    start_date: {
        type: Date,
        // default: Date.now
    },
    completion_date: {
        type: Date,
    }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;




// ** TO DO TASKS ** //
/*

    * Add Fields for project_start & project_end [ x ]
    * Team or Team Members assigned to Project   [ x ]
        * How to add members to project? (edit                      functionality)                           [   ]
    * Associate Sessions with Project            [ x ]
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    team_members : [ 
        {
            id : {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }, 
            username: {
                type: String
            }
        }
    ],
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
        * How to add members to project? (edit  functionality)                           [   ]

*/
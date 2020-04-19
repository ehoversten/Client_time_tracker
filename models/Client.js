const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    // not needed (?)
    // projects_name: [ 
    //     {
    //         _id : {
    //             type: Schema.Types.ObjectId,
    //             ref: 'Project'
    //         },
    //         project_name : {
    //             type: String
    //         }
    //     }
    // ],
    created_at: {
        type: Date,
        default: Date.now
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});


let Client = mongoose.model('Client', ClientSchema);

module.exports = Client;

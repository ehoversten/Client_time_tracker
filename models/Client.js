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
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});


let Client = mongoose.model('Client', ClientSchema);

module.exports = Client;


// ** TO DO TASKS ** //
/*

    * Add Fields for client_start & client_end
    * Team or Team Members assigned to Client (?)

*/
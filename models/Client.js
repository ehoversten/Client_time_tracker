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
            id : {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            },
            project_name : {
                type: String
            }
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
});


let Client = mongoose.model('Client', ClientSchema);

module.exports = Client;

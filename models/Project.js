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
    }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;




// ** TO DO TASKS ** //
/*

    * Add Fields for project_start & project_end
    * Team or Team Members assigned to Project (?)

*/
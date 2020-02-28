const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
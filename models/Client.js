const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    }
});


let Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
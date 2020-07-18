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

//-- Look into PRE HOOKS and mongoose --//

// const Comment = require("./comment");
// campgroundSchema.pre("remove", async function () {
//   await Comment.remove({
//     _id: {
//       $in: this.comments,
//     },
//   });
// });


let Client = mongoose.model('Client', ClientSchema);

module.exports = Client;

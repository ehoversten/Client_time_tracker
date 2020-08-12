const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name for client"],
  },
  contact: {
    type: String,
    trim: true,
  },
  primary: {
    type: String,
    trim: true,
    required: [true, "Please add a primary contact"],
  },
  secondary: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

//-- Look into PRE HOOKS with mongoose --//

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

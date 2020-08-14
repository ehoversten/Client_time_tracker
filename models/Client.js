const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
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
  },
  {
    //-- Mongoose Virtuals Options --//
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//-- Virtual Population
ClientSchema.virtual("clients_projects", {
  ref: "Project", // The model to use
  localField: "_id", // Find client where `localField`
  foreignField: "client_id", // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
//   options: { sort: { name: -1 }, limit: 5 }, // Query options, see http://bit.ly/mongoose-query-options
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

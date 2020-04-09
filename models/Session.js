const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  start_time: {
    type: Date,
    default: Date.now,
    required: true
  },
  end_time: {
    type: Date
    // required: true
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  },
  notes: {
    type: String
  },
  session_user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: {
      type: String
    }
  }
});


const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;



// ** TO DO TASKS ** //
/*

    * Will need MomentJS or other Date format Lib
    * Add Fields for project_start & project_end
    * Add User field and association

*/
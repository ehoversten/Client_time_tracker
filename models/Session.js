const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  start_time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_time: {
    type: Date,
    // required: true
  },
  // may not need this (?)
  project_work: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
    },
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  notes: {
    type: String,
  },
  session_user: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

//-- Create session_time Virtual --//
SessionSchema.virtual('session_duration').get(function() {
  let time_diff = this.start_time - this.end_time;
  console.log(time_diff);
  return time_diff;
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;


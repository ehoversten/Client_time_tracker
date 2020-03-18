const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  department: {
    type: String
  },
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Session"
    }
  ],
  assigned_to: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  ]
});

let User = mongoose.model('User', UserSchema);

module.exports = User;

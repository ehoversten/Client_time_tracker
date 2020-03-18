const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

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

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);

module.exports = User;

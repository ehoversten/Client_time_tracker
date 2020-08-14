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
    // required: true
  },
  email: {
      type: String
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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

//--  User full name Virtual --//
UserSchema.virtual('fullname').get(function() {
  return this.first_name + ' ' + this.last_name;
});



UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);

module.exports = User;

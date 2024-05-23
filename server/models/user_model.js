const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    // other optional attributes can be added here
  },
  location: {
    type: String,
    // other optional attributes can be added here
  },
  dateOfBirth: {
    type: Date,
    // other optional attributes can be added here
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  }],
}, { timestamps: true });

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;

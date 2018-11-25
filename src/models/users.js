const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;


const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose, {
  IncorrectUsernameError: 'Username is incorrect!',
});
const User = mongoose.model('User', UserSchema);

module.exports = User;

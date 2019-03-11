const mongoose              = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); //gives mongoose methods to UserSchema

module.exports = mongoose.model('User', UserSchema);
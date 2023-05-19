const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Firstname: String,
    Lastname: String,
    email: String,
    password: String,
    role: String
  });

module.exports = mongoose.model('users' , userSchema);
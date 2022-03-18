const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please, enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please, enter your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please, enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please, provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please, enter your password'],
    minLength: 8,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Please, enter your date of birth'],
  },
  countryOfResidence: {
    type: String,
    required: [true, 'Please, enter your country of residence'],
  },
});

usersSchema.methods.checkPassword = (candidatePassword, userPassword) => bcrypt
  .compareSync(candidatePassword, userPassword);

const Users = mongoose.model('users', usersSchema);

module.exports = Users;

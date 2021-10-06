const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = require('../config').ACCESS_TOKEN;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    slelect: false
  }
}, {
  timestamps: true
});

userSchema.methods.getData = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
  }
}

userSchema.methods.signJwt = function () {
  const data = this.getData();
  data.token = jwt.sign(data, jwtSecret);

  return data;
}

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
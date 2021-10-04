const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    token: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    accessToken: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// userSchema.methods.setVerifyToken = function () {
//   this.verificationToken = nanoid();
//   this.verify = false;
// };

const joiUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  googleId: Joi.string(),
  accessToken: Joi.string(),
  balance: Joi.number(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiUserSchema,
};

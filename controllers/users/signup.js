// const jwt = require('jsonwebtoken');
const { User } = require('../../model/schemas');
//const { httpCodes } = require('../../helpers/httpCodes');
const { Conflict } = require('http-errors');

const signup = async (req, res, next) => {
  try {
    const { email, password, name, googleId = '' } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      throw new Conflict('Email in use');
    }

    const newUser = new User({ email, name, googleId });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
      user: {
        email,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;

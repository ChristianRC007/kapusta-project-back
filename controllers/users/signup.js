const jwt = require('jsonwebtoken');
const { User } = require('../../model/schemas');
const { Conflict } = require('http-errors');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      throw new Conflict('Email in use');
    }

    const newUser = new User({ email, name });
    newUser.setPassword(password);
    await newUser.save();

    const { _id: id, balance } = newUser;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(
      id,
      { token },
      {
        new: true,
        select: 'token',
      },
    );

    res.status(201).json({
      token,
      user: {
        email,
        name,
        balance,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;

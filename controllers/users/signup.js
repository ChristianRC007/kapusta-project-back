const { User } = require('../../model/schemas');
const { Conflict } = require('http-errors');

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

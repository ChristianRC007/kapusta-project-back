const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../model/schemas');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized();
    }

    const [bearer, token] = req.headers.authorization.split(' ');
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }
    // const { id } = jwt.verify(token, SECRET_KEY);
    // const userId = await User.findById(id);
    jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({ token });
    // if (!user || !userId) {
    if (!user) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    // next(new Unauthorized('Not authorized'));
    next(new Unauthorized(error.message));
  }
};

module.exports = authentication;

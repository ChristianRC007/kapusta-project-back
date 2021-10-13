const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const { Unauthorized, BadRequest } = require('http-errors');

const { User } = require('../../model/schemas');

require('dotenv').config();
const { SECRET_KEY, CLIENT_ID } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password, name, tokenId } = req.body;

    if (!password && !tokenId) {
      throw new BadRequest('Password/tokenId is required');
    }

    let user = await User.findOne({ email });

    const compareResult = user && user.comparePassword(password);

    // Не найден email или неверный пароль и вход НЕ через google
    if ((!user || !compareResult) && !tokenId) {
      throw new Unauthorized('Email or password is wrong');
    }

    //Проверить пользователя google
    if (tokenId) {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client
        .verifyIdToken({
          idToken: tokenId,
          audience: CLIENT_ID,
        })
        .catch(() => {
          throw new Unauthorized('Invalid token');
        });

      const { name: googleName } = ticket.getPayload();
      //email не найден и вход через google - создать пользователя
      if (!user && ticket) {
        user = await User.create({
          email,
          name: googleName,
          balance: 0,
        });
      }
    }

    const { _id: id, balance } = user;
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

    res.json({
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

module.exports = login;

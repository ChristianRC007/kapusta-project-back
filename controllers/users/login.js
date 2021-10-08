const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../../model/schemas');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, googleId, name } = req.body;

  let user = await User.findOne({ email });

  const compareResult = user && user.comparePassword(password);

  // Не найден email или неверный пароль и вход НЕ через google
  if ((!user || !compareResult) && !googleId) {
    throw new Unauthorized('Email or password is wrong');
  }

  //email не найден и вход через google - создать пользователя
  if (!user && googleId) {
    user = await User.create({
      email,
      name,
      googleId,
      // accessToken,
      balance: 0,
    });
  }

  // ??? Вход через google, но googleId не совпадает
  if (googleId && user && user.googleId !== googleId) {
    throw new Unauthorized('GoogleId is wrong');
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
};

module.exports = login;

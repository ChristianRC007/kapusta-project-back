const { User } = require('../../model/schemas');
const { Unauthorized } = require('http-errors');

const current = async (req, res) => {
  const token = req.user.token;
  const user = await User.findOne({ token });
  if (!user) {
    throw new Unauthorized('Not authorized');
  }
  res.status(200).json({
    user: {
      email: user.email,
      balance: user.balance,
      name: user.name,
    },
  });
};
module.exports = current;

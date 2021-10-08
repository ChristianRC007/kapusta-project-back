const { User } = require('../../model/schemas');
const { NotFound } = require('http-errors');

const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user._id;
    const { balance } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      _id,
      { balance },
      { new: true },
    );
    if (!updateUser) {
      throw new NotFound();
    }
    res.json({
      status: 'success',
      code: 200,
      user: {
        email: updateUser.email,
        balance: updateUser.balance,
      },
    });
  } catch (error) {
    next(error);
  }
  console.log('updateBalance');
};

module.exports = updateBalance;

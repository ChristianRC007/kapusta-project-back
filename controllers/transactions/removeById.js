const { Transaction } = require('../../model/schemas');
const { User } = require('../../model/schemas');
const { NotFound } = require('http-errors');

const removeById = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const { transactionId } = req.params;
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      throw new NotFound();
    }

    const user = await User.findById(userId);

    if (transaction.isIncome) {
      user.balance -= transaction.amount;
    } else {
      user.balance += transaction.amount;
    }

    await user.save();

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;

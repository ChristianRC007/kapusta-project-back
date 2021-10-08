const { Transaction } = require('../../model/schemas');
const { User } = require('../../model/schemas');

const addIncome = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id.toString();

    const transactionData = await Transaction.create({
      ...req.body,
      isIncome: true,
      owner: userId,
    });

    res.status(201).json({
      transactionData,
    });

    const user = await User.findById(userId);
    user.balance += amount;
    await user.save();
  } catch (error) {
    next(error);
  }
};

module.exports = addIncome;

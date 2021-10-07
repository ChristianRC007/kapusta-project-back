const { Transaction } = require('../../model/schemas');

const addExpense = async (req, res, next) => {
  try {
    const transactionData = await Transaction.create({
      ...req.body,
      isIncome: false,
      // owner: req.user._id,
    });

    res.status(201).json({
      transactionData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addExpense;

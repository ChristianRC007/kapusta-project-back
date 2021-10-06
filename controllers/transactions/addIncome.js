const { Transaction } = require('../../model/schemas');

const addIncome = async (req, res, next) => {
  try {
    const transactionData = await Transaction.create({
      ...req.body,
      isIncome: true,
      // owner: req.user._id,
    });

    res.status(201).json({
      transactionData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addIncome;

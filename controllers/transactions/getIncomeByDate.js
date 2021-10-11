const { Transaction } = require('../../model/schemas');

const getIncomeByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    const transactions = await Transaction.find({
      date: new Date(date),
      isIncome: true,
      owner: req.user._id,
    }).populate('owner', '_id email name balance');

    res.status(200).json({
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getIncomeByDate;

const { Transaction } = require('../../model/schemas');

const getLast = async (req, res, next) => {
  try {
    const { count = 3 } = { ...req.query };

    const transactions = await Transaction.find({
      owner: req.user._id,
    })
      .populate('owner', '_id email name balance')
      .limit(+count)
      .sort({ date: -1 });

    res.status(200).json({
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getLast;

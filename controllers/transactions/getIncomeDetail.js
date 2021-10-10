const { Transaction } = require('../../model/schemas');

const getIncomeDetail = async (req, res, next) => {
  try {
    const { date } = req.params;
    const curDate = new Date(date);
    const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 0);
    const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1);

    // console.log(firstDay);
    // console.log(lastDay);

    const incomeDetail = await Transaction.aggregate([
      {
        $match: {
          isIncome: true,
          date: { $gte: firstDay, $lte: lastDay },
          owner: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            description: '$description',
            category: '$category',
          },
          totalDescriptions: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: '$_id.category',
          descriptions: {
            $push: {
              description: '$_id.description',
              total: '$totalDescriptions',
            },
          },
          total: { $sum: '$totalDescriptions' },
        },
      },
    ]);

    const maxDateEntry = await Transaction.findOne()
      .sort({ date: -1 })
      .limit(1);

    const minDateEntry = await Transaction.findOne()
      .sort({ date: +1 })
      .limit(1);

    res.status(200).json({
      incomeDetail,
      dates: { minDate: minDateEntry.date, maxDate: maxDateEntry.date },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getIncomeDetail;

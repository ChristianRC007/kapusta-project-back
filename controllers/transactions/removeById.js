const { Transaction } = require('../../model/schemas');
const { NotFound } = require('http-errors');

const removeById = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      throw new NotFound();
    }
    res.json({
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;

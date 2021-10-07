const { Transaction } = require('../../model/schemas');
const { NotFound } = require('http-errors');

const removeById = async (req, res, next) => {
  const { transactionId } = req.params;
  const transaction = await Transaction.findByIdAndDelete(transactionId);
  if (!transaction) {
    return res.status(404).json({
      message: 'Not found',
    });
  }
  res.json({
    status: 'success',
    code: 200,
    transaction,
  });
};

module.exports = removeById;

const express = require('express');

const { joiTransactionSchema } = require('../../model/schemas');
const {
  validation,
  authentication,
  controllerWrapper,
} = require('../../middlewares');
const { transactions } = require('../../controllers');

const router = express.Router();

const transactionValidationMiddleware = validation(joiTransactionSchema);

router.post(
  '/addIncome',
  authentication,
  transactionValidationMiddleware,
  controllerWrapper(transactions.addIncome),
);

router.post(
  '/addExpense',
  authentication,
  transactionValidationMiddleware,
  controllerWrapper(transactions.addExpense),
);

router.delete(
  '/:transactionId',
  authentication,
  controllerWrapper(transactions.removeById),
);

//TODO: 11. Реализовать энд-поинт получения сводки о месяцах текущего года по расходам
router.get(
  '/getExpenseDetail',
  // authentication,
  controllerWrapper(transactions.getExpenseDetail),
);

//TODO: 12. Реализовать энд-поинт получения сводки о месяцах текущего года по доходам
router.get(
  '/getIncomeDetail',
  // authentication,
  controllerWrapper(transactions.getIncomeDetail),
);

module.exports = router;

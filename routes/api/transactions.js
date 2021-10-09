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

router.get(
  '/getExpenseByDate/:date',
  authentication,
  controllerWrapper(transactions.getExpenseByDate),
);

router.get(
  '/getIncomeByDate/:date',
  authentication,
  controllerWrapper(transactions.getIncomeByDate),
);

router.get(
  '/getExpenseByMonth',
  authentication,
  controllerWrapper(transactions.getExpenseByMonth),
);

router.get(
  '/getIncomeByMonth',
  authentication,
  controllerWrapper(transactions.getIncomeByMonth),
);

router.get(
  '/getExpenseDetail/:date',
  authentication,
  controllerWrapper(transactions.getExpenseDetail),
);

router.get(
  '/getIncomeDetail/:date',
  authentication,
  controllerWrapper(transactions.getIncomeDetail),
);

router.get('/getLast', authentication, controllerWrapper(transactions.getLast));

module.exports = router;

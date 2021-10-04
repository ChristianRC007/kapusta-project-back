const express = require('express');
const cors = require('cors');
const { httpCodes } = require('./helpers/httpCodes');

const usersRouter = require('./routes/api/users');
// const transactionsRouter = require('./routes/api/transactions')

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/transactions', transactionsRouter);

app.use((req, res) => {
  res.status(httpCodes.NOT_FOUND).json({
    status: 'error',
    code: httpCodes.NOT_FOUND,
    message: `Use API on routes ${req.baseUrl}/api/v1/transactions`,
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  const { status = 500, message = 'Internal server error' } = err;
  res.status(status).json({
    code: status,
    message,
  });
});

module.exports = app;

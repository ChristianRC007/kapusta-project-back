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

app.use((err, req, res, next) => {
  const { status = 500, message = 'Internal server error' } = err;
  res.status(status).json({
    message,
  });
});

// app.use((err, req, res) => {
//   err.status = err.status ? err.status : httpCodes.INTERNAL_SERVER_ERROR;
//   res.status(err.status).json({
//     status: err.status === 500 ? 'failed' : 'error',
//     code: err.status,
//     message: err.message,
//     data: err.status === 500 ? 'Internal server error' : err.data,
//   });
// });

module.exports = app;

const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // These parameters are no longer supported from version Mongoose 6.x
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

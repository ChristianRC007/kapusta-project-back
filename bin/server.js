const app = require('../app');
// const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// const db = mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// mongoose.connection.on('connected', () => {
//   console.log('Database connection successful');
// });

// mongoose.connection.on('error', error => {
//   console.log(`Mongoose contction error: ${error.message}`);
// });

// mongoose.connection.on('disconnected', () => {
//   console.log('Database disconnected');
// });

// db.then(() => {
//   app.listen(PORT, async function () {
//     console.log(`Server running. Use our API on port: ${PORT}`);
//   });
// }).catch(err => {
//   console.log(`Server not running. Error message: ${err.message}`);
//   process.exit(1);
// });

app.listen(PORT, async function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

// module.exports = db;

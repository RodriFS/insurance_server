const mongoose = require('mongoose');

// connect to database
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
// eslint-disable-next-line
db.on('error', console.error.bind(console, 'connection error:'));
// eslint-disable-next-line
db.once('open', () => console.log('Database coonected'));

module.exports = db;

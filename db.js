const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`MongoDB Error: ${err.message}`);
});

db.once('open', () => console.log('connected to DB'));
db.once('close', () => console.l('Connection to DB closed...'));

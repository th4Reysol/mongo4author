const mongoose = require('mongoose');

const words = mongoose.Schema({
  english: String,
  japanese: String,
});

module.exports = mongoose.model('words',words);
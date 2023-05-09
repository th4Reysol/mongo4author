const mongoose = require('mongoose');

const words = mongoose.Schema({
  English: String,
  Japanese: String,
});

module.exports = mongoose.model('words',words);
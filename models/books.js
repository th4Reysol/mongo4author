const mongoose = require('mongoose');

const books = mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.model('books',books);
const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'],
    reqired: [true, 'transaction type must be entered'],
  },
  accountId: {
    type: mongoose.ObjectId,
    ref: 'accounts',
    reqired: [true, 'transaction must be belong to the account'],
  },
  title: {
    type: String,
    reqired: [true, 'transaction title must be entered'],
  },
  description: {
    type: String,
    reqired: [true, 'transaction description must be entered'],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'categories',
    required: [true, 'transaction category must be entered'],
  },
  amount: {
    type: Number,
    required: [true, 'transaction amount must be entered'],
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },
});

const Transactions = mongoose.model('transactions', transactionsSchema);

module.exports = Transactions;

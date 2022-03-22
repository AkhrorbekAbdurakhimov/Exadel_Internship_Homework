import mongoose from 'mongoose';

const accountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: 'users',
    required: [true, 'account must be belong to user'],
  },
  title: {
    type: String,
    required: [true, 'Please, enter account title'],
  },
  description: {
    type: String,
    required: [true, 'Please, enter account description'],
  },
  currencyId: {
    type: mongoose.ObjectId,
    ref: 'currencies',
    required: [true, 'account must have a currency'],
  },
  total: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  update_at: {
    type: Date,
    default: null,
  },
});

const Accounts = mongoose.model('accounts', accountsSchema);

export default Accounts;

import express from 'express';
import Transactions from '../models/transactions.mjs';

const router = express.Router();

const getTransactions = async (req, res) => {
  try {
    const result = await Transactions.find();
    res.status(200).send({
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

const addTransactions = async (req, res) => {
  try {
    const transaction = await Transactions.create(req.body);
    if (transaction) {
      res.status(200).send({
        message: 'transaction added successfully',
        transaction,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

router.get('/', getTransactions);
router.post('/', addTransactions);

export default router;

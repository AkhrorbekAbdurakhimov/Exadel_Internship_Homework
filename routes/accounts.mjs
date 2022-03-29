import express from 'express';
import Accounts from '../models/accounts.mjs';

const router = express.Router();

const getAccounts = async (req, res) => {
  try {
    const result = await Accounts.find();
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

const addAccount = async (req, res) => {
  try {
    const account = await Accounts.create({ ...req.body, userId: req.user._id });
    if (account) {
      res.status(200).send({
        message: 'account added successfully',
        account,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

router.get('/', getAccounts);
router.post('/', addAccount);

export default router;

const router = require('express').Router();

const Account = require('../api/accounts');

const getAccounts = async (req, res) => {
  const accounts = await Account.getAccounts();
  res.status(200).send(accounts);
};

const addAccount = async (req, res) => {
  try {
    const account = new Account({ ...req.body, userId: req.user.id });
    const responseData = await account.addAccount();

    res.status(200).send({
      message: 'Account added successfully',
      account: responseData,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

router.get('/', getAccounts);
router.post('/', addAccount);

module.exports = router;

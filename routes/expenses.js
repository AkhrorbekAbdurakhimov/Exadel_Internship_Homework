const router = require('express').Router();

const getExpenses = (req, res) => {
  res.status(200).send({
    message: 'You call all expenses',
  });
};

const addExpense = (req, res) => {
  res.status(200).send({
    message: 'You added expense',
  });
};

const updateExpense = (req, res) => {
  res.status(200).send({
    message: 'You updated expense',
  });
};

const deleteExpense = (req, res) => {
  res.status(200).send({
    message: 'You deleted expense',
  });
};

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;

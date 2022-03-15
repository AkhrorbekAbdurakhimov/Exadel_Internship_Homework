const router = require('express').Router();

const getIncomes = (req, res) => {
  res.status(200).send({
    message: 'You call all incomes',
  });
};

const addIncome = (req, res) => {
  res.status(200).send({
    message: 'You added income',
  });
};

const updateIncome = (req, res) => {
  res.status(200).send({
    message: 'You updated income',
  });
};

const deleteIncome = (req, res) => {
  res.status(200).send({
    message: 'You deleted income',
  });
};

router.get('/', getIncomes);
router.post('/', addIncome);
router.put('/:id', updateIncome);
router.delete('/:id', deleteIncome);

module.exports = router;

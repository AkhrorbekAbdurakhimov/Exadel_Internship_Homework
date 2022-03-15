const fs = require('fs');
const path = require('path');

const router = require('express').Router();

const filePath = path.join(process.cwd(), 'database', 'users.json');
const users = fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

const getAllUsers = (req, res) => {
  res.status(200).send(users);
};

const addUser = (req, res) => {
  res.status(200).send({
    message: 'You added user',
  });
};

const updateUser = (req, res) => {
  res.status(200).send({
    message: 'You updated user',
  });
};

const deleteUser = (req, res) => {
  res.status(200).send({
    message: 'You deleted user',
  });
};

router.get('/', getAllUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

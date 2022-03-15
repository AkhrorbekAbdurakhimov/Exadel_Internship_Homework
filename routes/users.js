const fs = require('fs');
const path = require('path');

const router = require('express').Router();

const filePath = path.join(process.cwd(), 'database', 'users.json');
const users = fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

const getAllUsers = (req, res) => {
  res.status(200).send(users);
};

router.get('/', getAllUsers);

module.exports = router;

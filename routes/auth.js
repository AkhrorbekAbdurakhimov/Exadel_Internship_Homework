const fs = require('fs');
const path = require('path');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { JWT } = require('../config');

const filePath = path.join(process.cwd(), 'database', 'users.json');
const users = fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

const registerUser = (req, res) => {
  const { email, password, role } = req.body;
  if (email && password && role) {
    const user = users.find((value) => value.email === email);
    if (!user) {
      users.push({
        id: users.length ? Number(users[users.length - 1].id) + 1 : 1,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
      });

      fs.writeFileSync(filePath, JSON.stringify(users, null, 4));

      res.status(201).send({
        message: 'User successfully registered, Please login',
      });
    } else {
      res.status(500).send({
        message: 'This kind of email already exists! Please try again',
      });
    }
  } else {
    res.status(500).send({
      message: 'Invalid parameters',
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(
      (value) => value.email === email && bcrypt.compareSync(password, value.password),
    );
    if (user) {
      delete user.password;
      const token = jwt.sign(user, JWT.sercetKey, { expiresIn: JWT.expiresIn });
      res.status(200).send({
        message: 'User successfully logged in',
        token,
        user,
      });
    } else {
      res.status(401).send({
        message: 'Unathorized: invalid login or password',
      });
    }
  } else {
    res.status(500).send({
      message: 'Invalid parameters',
    });
  }
};

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;

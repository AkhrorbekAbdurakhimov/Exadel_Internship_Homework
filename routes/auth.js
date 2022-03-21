const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('../models/users');

const { JWT } = require('../config');

const loginUser = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user && user.checkPassword(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT.sercetKey, { expiresIn: JWT.expiresIn });
      res.status(200).send({
        message: 'User successfully logged in',
        token,
        user,
      });
    } else {
      res.status(401).send({
        message: 'Unathorized',
        err: 'Incorrect password or email address',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: 'Internal server error',
      err: err.message,
    });
  }
};

router.post('/login', loginUser);

module.exports = router;

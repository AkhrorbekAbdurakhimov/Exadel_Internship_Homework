import users from '../models/users.mjs';

const permissionHandler = (req, res, next) => {
  const user = users.findOne({ email: req.user.email, role: 'admin' });
  if (user) {
    next();
  } else {
    res.status(403).send({
      message: 'Permission denied',
    });
  }
};

export default permissionHandler;

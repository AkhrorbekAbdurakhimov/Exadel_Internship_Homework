const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'database', 'users.json');
const users = fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

const permissionHandler = (req, res, next) => {
  const user = users.find((value) => value.email === req.user.email && value.role.toLowerCase() === 'admin');
  if (user) {
    next();
  } else {
    res.status(403).send({
      message: 'Permission denied',
    });
  }
};

module.exports = permissionHandler;

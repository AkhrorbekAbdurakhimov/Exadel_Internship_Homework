const cors = require('cors');
const express = require('express');
const passport = require('passport');

const app = express();

const { APP } = require('./config');
const auth = require('./middleware/auth');
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const permissionHandler = require('./middleware/permission-handler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/books', auth, booksRouter);
app.use('/api/users', auth, permissionHandler, usersRouter);

app.listen(APP.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${APP.ENV} server is running on port ${APP.PORT}`);
});

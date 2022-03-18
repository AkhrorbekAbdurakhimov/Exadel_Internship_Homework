const cors = require('cors');
const express = require('express');
const passport = require('passport');

const app = express();

const { APP } = require('./config');
const auth = require('./middleware/auth');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const incomesRouter = require('./routes/incomes');
const expensesRouter = require('./routes/expenses');
const accountsRouter = require('./routes/accounts');
const permissionHandler = require('./middleware/permission-handler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/users', auth, permissionHandler, usersRouter);
app.use('/api/incomes', auth, incomesRouter);
app.use('/api/expenses', auth, expensesRouter);
app.use('/api/accounts', auth, accountsRouter);

app.listen(APP.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${APP.ENV} server is running on port ${APP.PORT}`);
});

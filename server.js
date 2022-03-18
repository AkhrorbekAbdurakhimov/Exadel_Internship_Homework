const cors = require('cors');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const { APP, DB } = require('./config');

const authRouter = require('./routes/auth');
const accountsRouter = require('./routes/accounts');
const transactionsRouter = require('./routes/transactions');

const auth = require('./middleware/auth');
const permissionHandler = require('./middleware/permission-handler');

const app = express();
const mongoUrl = `${DB.MONGODB_URL}${DB.DATABASE_NAME}`;

mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/accounts', auth, permissionHandler, accountsRouter);
app.use('/api/transactions', auth, transactionsRouter);


app.listen(APP.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${APP.ENV} server is running on port ${APP.PORT}`);
});

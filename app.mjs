import cors from 'cors';
import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';

import { DB } from './config/index.mjs';

import authRouter from './routes/auth.mjs';
import accountsRouter from './routes/accounts.mjs';
import transactionsRouter from './routes/transactions.mjs';

import auth from './middleware/auth.mjs';
import permissionHandler from './middleware/permission-handler.mjs';

const app = express();
const mongoUrl = DB.MONGO_CONNECTION_STR;

mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/accounts', auth, permissionHandler, accountsRouter);
app.use('/api/transactions', auth, transactionsRouter);

export {
  app
}

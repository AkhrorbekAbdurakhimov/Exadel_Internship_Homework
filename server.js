const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const NODE_PORT = process.env.NODE_PORT || 5000;
const NODE_DEV = process.env.NODE_DEV || 'development';

const booksRouter = require('./routes/books');

app.use(express.json());
app.use('/api/books', booksRouter);

app.listen(NODE_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`${NODE_DEV} server is running on port ${NODE_PORT}`);
});

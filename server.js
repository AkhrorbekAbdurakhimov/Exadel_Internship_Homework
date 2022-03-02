const express = require('express');

const app = express();

const NODE_PORT = 5000;
const NODE_DEV = 'development';

const booksRouter = require("./routes/books");

app.use(express.json());
app.use('/api/books', booksRouter);

app.listen(NODE_PORT, () => { console.log(`${NODE_DEV} server is running on port ${NODE_PORT}`) });
const fs = require('fs');
const path = require('path');

const router = require('express').Router();

const filePath = path.join(process.cwd(), 'database', 'books.json');
const books = fs.readFileSync(filePath, 'utf8') ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

const getAllBooks = (req, res) => {
  res.status(200).send({
    message: 'success',
    data: books,
  });
};

const getBook = (req, res) => {
  const { id } = req.params;
  const book = books.find((value) => value.id === Number(id));

  if (book) {
    res.status(200).send({
      message: 'success',
      data: book,
    });
  } else {
    res.status(404).send({
      message: 'book not found',
    });
  }
};

const addBook = (req, res) => {
  const { title, author } = req.body;

  if (title && author) {
    books.push({
      id: books.length ? Number(books[books.length - 1].id) + 1 : 1,
      title,
      author,
    });

    fs.writeFileSync(filePath, JSON.stringify(books, null, 4));

    res.status(200).send({
      message: 'Book added successfully',
    });
  } else {
    res.status(500).send({
      message: 'Invalid parameters',
    });
  }
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const searchedBook = books.find((value) => value.id === Number(id));

  if (!searchedBook) {
    res.status(404).send({
      message: 'book not found',
    });
  }

  if (id && title && author) {
    /* eslint-disable */
    books.map((book) => {
      if (book.id === Number(id)) {
        book.title = title || book.title;
        book.author = author || book.author;
      }
      return book;
    });
    /* eslint-disable */

    fs.writeFileSync(filePath, JSON.stringify(books, null, 4));

    res.status(200).send({
      message: 'Book updated successfully',
    });
  } else {
    res.status(500).send({
      message: 'Invalid parameters',
    });
  }
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  const searchedBook = books.find((value) => value.id === Number(id));

  if (!searchedBook) {
    res.status(404).send({
      message: 'book not found',
    });
  }

  const filteredBooks = books.filter((value) => value.id !== Number(id));
  fs.writeFileSync(filePath, JSON.stringify(filteredBooks, null, 4));

  res.status(200).send({
    message: 'Book deleted successfully',
  });
};

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;

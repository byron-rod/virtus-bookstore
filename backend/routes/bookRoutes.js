const e = require("cors");
const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const Book = require("../models/bookModel");

// @desc Fetch all books
// @route GET /api/books
// @access Public
router.route("/").get(
  asyncHandler(async (req, res) => {
    const books = await Book.find({});
    res.json(books);
  })
);

// @desc Fetch single book
// @route GET /api/books/:id
// @access Public
router.route("/:id").get(
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error("Libro no encontrado");
    }
  })
);

module.exports = router;

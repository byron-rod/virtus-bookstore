const e = require("cors");
const express = require("express");
const router = express.Router();
const { getBooks, getBookById } = require("../controller/bookController");

router.route("/").get(getBooks);
router.route("/:id").get(getBookById);

module.exports = router;

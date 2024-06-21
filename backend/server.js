const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const books = require("./data/books");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});
app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b._id === req.params.id);
  res.json(book);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const bookRoutes = require("./routes/bookRoutes");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/books", bookRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

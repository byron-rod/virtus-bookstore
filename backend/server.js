const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recurrenteRoutes = require("./routes/recurrenteRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const bookRoutes = require("./routes/bookRoutes");
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/recurrente", recurrenteRoutes);
app.use("/api/recurrente/checkouts", checkoutRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

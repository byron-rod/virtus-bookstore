const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const bookRoutes = require("./routes/bookRoutes");
const port = process.env.PORT || 5000;
const path = require("path");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/books", bookRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/pedidos", pedidoRoutes);

if (process.env.NODE_ENV === "production") {
  // Adjust the path to go up one level from backend and then into frontend/dist
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.use("/robots.txt", express.static(path.join(__dirname, "robots.txt")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

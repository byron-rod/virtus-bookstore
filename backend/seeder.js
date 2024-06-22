const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const usuarios = require("./data/usuarios");
const books = require("./data/books");
const Usuario = require("./models/usuarioModel");
const Book = require("./models/bookModel");
const Pedido = require("./models/pedidoModel");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Pedido.deleteMany();
    await Book.deleteMany();
    await Usuario.deleteMany();

    const crearUsuarios = await Usuario.insertMany(usuarios);

    const adminUsuario = crearUsuarios[0]._id;

    const sampleBooks = books.map((book) => {
      return { ...book, usuario: adminUsuario };
    });

    await Book.insertMany(sampleBooks);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Pedido.deleteMany();
    await Book.deleteMany();
    await Usuario.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

const bcrypt = require("bcryptjs");

const usuarios = [
  {
    nombre: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    esAdmin: true,
  },
  {
    nombre: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    nombre: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = usuarios;

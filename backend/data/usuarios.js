const bcrypt = require("bcryptjs");

const usuarios = [
  {
    nombre: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    esAdmin: true,
  },
  {
    nombre: "Virgilio Cordon",
    email: "virgilio.cordon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    esAdmin: true,
  },
  {
    nombre: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = usuarios;

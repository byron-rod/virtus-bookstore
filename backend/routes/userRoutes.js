const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const Usuario = require("../models/usuarioModel");

// @desc get users
// @route GET /api/usuarios
// @access Private/Admin
router.route("/").get(
  asyncHandler(async (req, res) => {
    const usuarios = await Usuario.find({});
    res.json(usuarios);
  })
);

// @desc get user profile
// @route GET /api/usuarios/perfil
// @access Private

// @desc update user profile
// @route PUT /api/usuarios/perfil
// @access Private

// @desc logout user
// @route GET /api/usuarios/logout
// @access Private
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
  })
);

module.exports = router;

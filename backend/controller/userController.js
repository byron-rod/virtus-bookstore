const asyncHandler = require("../middleware/asyncHandler");
const Usuario = require("../models/usuarioModel");
const generateToken = require("../utils/generateToken");

// @desc Auth user & get token
// @route POST /api/usuarios/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Usuario.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      esAdmin: user.esAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register a new user
// @route POST /api/usuarios
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { nombre, email, password } = req.body;

  const userExists = await Usuario.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Usuario.create({
    nombre,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      esAdmin: user.esAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user & clear cookie
// @route POST /api/usuarios/logout
// @access Private
const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get user profile
// @route GET /api/usuarios/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Usuario.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      esAdmin: user.esAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/usuarios/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("Request user:", req.usuario);
  const user = await Usuario.findById(req.usuario._id);

  if (user) {
    user.nombre = req.body.nombre || user.nombre;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      esAdmin: updatedUser.esAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/usuarios
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const usuarios = await Usuario.find({});
  res.status(200).json(usuarios);
});

// @desc Get user by ID
// @route GET /api/usuarios/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params.id).select("-password");

  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

// @desc Delete user
// @route DELETE /api/usuarios/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);

  if (usuario) {
    if (usuario.esAdmin) {
      res.status(400);
      throw new Error("No se puede eliminar un usuario administrador");
    }
    await Usuario.deleteOne({ _id: usuario._id });
    res.status(200).json({ message: "Usuario eliminado" });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

// @desc Update user
// @route PUT /api/usuarios/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);

  if (usuario) {
    usuario.nombre = req.body.nombre || usuario.nombre;
    usuario.email = req.body.email || usuario.email;
    usuario.esAdmin = Boolean(req.body.esAdmin);

    const updatedUser = await usuario.save();

    res.status(200).json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      esAdmin: updatedUser.esAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Usuario no encontrado");
  }
});

module.exports = {
  authUser,
  registerUser,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};

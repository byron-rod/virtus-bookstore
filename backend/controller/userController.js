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
  const user = await Usuario.findById(req.user._id);

  if (user) {
    user.nombre = req.body.nombre || user.nombre;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    generateToken(res, updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      esAdmin: updatedUser.esAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get all users
// @route GET /api/usuarios
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get Users Route");
});

// @desc Delete user
// @route DELETE /api/usuarios/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User Route");
});

// @desc Get user by ID
// @route GET /api/usuarios/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User by ID Route");
});

// @desc Update user
// @route PUT /api/usuarios/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update Admin User Route");
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

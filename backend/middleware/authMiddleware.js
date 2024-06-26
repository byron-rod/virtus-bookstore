const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const Usuario = require("../models/usuarioModel");

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Usuario.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.esAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };

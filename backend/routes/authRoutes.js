const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const Usuario = require("../models/usuarioModel");
const admin = require("../firebase");

// Middleware to verify Firebase token
async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

  if (!idToken) {
    return res.status(403).send("Unauthorized");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}

// Route to create or return existing user
router.post(
  "/api/auth",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { uid, nombre, email } = req.user;

    let user = await Usuario.findOne({ uid });

    if (!user) {
      user = new Usuario({
        uid,
        nombre,
        email,
      });
      await user.save();
    }
    res.send(user);
  })
);

// function to get all users
router.get(
  "/api/users",
  asyncHandler(async (req, res) => {
    console.log("Fetching all users");
    const users = await Usuario.find({});
    console.log("Users found:", users);
    if (!users || users.length === 0) {
      return res.status(404).send("No users found");
    }
    res.send(users);
  })
);

module.exports = router;

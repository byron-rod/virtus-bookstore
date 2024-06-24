const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const Usuario = require("../models/usuarioModel");
const admin = require("../firebase");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { token } = req.body;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      res.json(decodedToken);
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  })
);

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password, nombre } = req.body;
  try {
    // Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Save user to MongoDB
    const newUser = new Usuario({
      uid: userRecord.uid,
      nombre: nombre,
      email: email,
      contrasena: hashedPassword,
    });

    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

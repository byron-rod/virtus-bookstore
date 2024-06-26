const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc").Strategy;
const db = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler");
const Usuario = require("../models/usuarioModel");
const bcrypt = require("bcryptjs");

// @desc Facebook login
// @route POST /api/auth/facebook
// @access Public

// Middleware to log incoming requests
router.use((req, res, next) => {
  console.log(`Received request for ${req.url}`);
  next();
});

// Facebook login route
router.get("/login", (req, res) => {
  res.render("login");
});

router.get(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:5000/api/auth/oauth2/redirect/google",
    },
    function (issuer, profile, cb) {
      // Instead of finding or creating a user, simply return the profile
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "http://localhost:5173/login",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

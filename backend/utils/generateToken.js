const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    secure: process.env.NODE_ENV !== "develpment",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

module.exports = generateToken;

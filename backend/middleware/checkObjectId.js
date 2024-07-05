const { isValidObjectId } = require("mongoose");

const checkObjectId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error(`Invalid ID: ${req.params.id}`);
  }
  next();
};

module.exports = checkObjectId;

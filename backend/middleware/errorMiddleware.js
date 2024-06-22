const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for Mongoose bad ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Libro no encontrado";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "stack" : err.stack,
  });
};

module.exports = { notFound, errorHandler };

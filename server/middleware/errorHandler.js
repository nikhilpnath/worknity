const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 400;
  res.status(statusCode).json({
    success: false,
    error: err.message || err || "Internal Server Error",
  });
};

export default errorHandler;

const sendErrorTodev = function (err, res) {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorToprod = function (err, res) {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const GlobalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorTodev(err, res);
  } else {
    sendErrorToprod(err, res);
  }
};

export default GlobalError;

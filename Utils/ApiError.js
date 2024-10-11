class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;
  }
}

export default ApiError;

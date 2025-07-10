import { STATUS_CODES } from "../constants/appConstants";

const errorHandler = (err, req, res, next) => {
  err.stack && console.error(err.stack);
  const statusCode = err.statusCode || STATUS_CODES.InternalServerError;
  const message = err.message || err.error || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(err.stack && { stack: err.stack }),
  });
};

export default errorHandler;

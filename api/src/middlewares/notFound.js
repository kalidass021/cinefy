import error from '../utils/error.js';

const notFound = (req, res, next) => {
  return next(error(404, `${req.originalUrl} not found`));
};

export default notFound;

import error from '../utils/error';

const notFound = (req, res, next) => {
  return next(error(404, `${req.originalUrl} not found`));
};

export default notFound;

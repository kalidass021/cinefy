import { isValidObjectId } from 'mongoose';
import error from '../utils/error.js';

const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(error(404, `Invalid Object of: ${req.params.id}`));
  }

  // else
  // call the next function
  next();
};

export default checkId;

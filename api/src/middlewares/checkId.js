import { isValidObjectId } from 'mongoose';
import customError from '../utils/customError.js';

const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(customError(404, `Invalid Object of: ${req.params.id}`));
  }

  // else
  // call the next function
  next();
};

export default checkId;

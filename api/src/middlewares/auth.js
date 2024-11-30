import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';
import error from '../utils/error.js';

// check if the user is authenticated or not

export const authenticate = asyncHandler(async (req, res, next) => {
  try {
    // read jwt from the 'jwt' cookie
    const token = req.cookies.jwt;

    if (!token) {
      return next(error(401, 'Unauthorized: No token provided'));
    }
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    // edge case
    if (!decodedObj) {
      return next(error(401, 'Unauthorized: Invalid token'));
    }

    const user = await User.findById(decodedObj.userId).select('-password');
    // check before adding user req object
    if (!user) {
      return next(error(404, 'User not found'));
    }

    // add user to the req object
    req.user = user;
    // call the next function
    next();
  } catch (err) {
    console.error(`Error while auth ${err}`);
    next(err);
  }
});

export const authorizeAdmin = (req, res, next) => {
  const { user } = req;
  if (user && user.isAdmin) {
    // call the next function
    next();
  } else {
    next(error(401, 'Not authorized as an admin'));
  }
};

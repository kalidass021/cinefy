import User from '../models/User.js';
import customError from '../utils/customError.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (err) {
    console.error(`Error in getAllUsers controller ${err}`);
    next(err);
  }
};

export const getCurrentUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
        return next(customError(404, 'User not found'));
    }

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
    })
  } catch (err) {
    console.error(`Error in getCurrentUserProfile controller ${err}`);
    next(err);
  }
};

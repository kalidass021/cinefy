import bcrypt from 'bcryptjs';
import { User } from '../models';
import { error } from '../utils';

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
      return next(error(404, 'User not found'));
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error(`Error in getCurrentUserProfile controller ${err}`);
    next(err);
  }
};

export const updateCurrentUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(error(404, 'User not found'));
    }

    // if user
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (err) {
    console.error(`Error in updateCurrentUserProfile controller ${err}`);
    next(err);
  }
};

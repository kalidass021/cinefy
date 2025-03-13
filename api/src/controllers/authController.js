import bcrypt from 'bcryptjs';
import { User } from '../models';
// import asyncHandler from '../middlewares/asyncHandler.js';
import { generateToken, error } from '../utils';

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(error(400, 'Please fill all the fields'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(error(400, 'Invalid email format'));
    }

    if (password.length < 6) {
      return next(error(400, 'Password must be atleaset 6 characters long'));
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return next(error(400, 'Username already exists'));
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(error(400, 'Email already exists'));
    }

    // hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (err) {
    console.error(`Error in signup controller ${err}`);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(error(400, 'Please fill all the details'));
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(error(401, 'Invalid email or password'));
    }

    // if existingUser check the password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser?.password || ''
    );

    if (!isPasswordValid) {
      return next(error(401, 'Invalid email or password'));
    }

    // call the generatetoken function to generate token and set the cookie
    generateToken(res, existingUser._id);

    res.status(201).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    });
  } catch (err) {
    console.error(`Error in signin controller ${err}`);
    next(err);
  }
};

export const signoutCurrentUser = async (req, res, next) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: 'logged out successfully' });
  } catch (err) {
    console.error(`Error in signout controller ${err}`);
    next(err);
  }
};

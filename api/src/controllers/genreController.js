import Genre from '../models/Genre.js';
import customError from '../utils/customError.js';

export const createGenre = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(customError(400, 'Name is required'));
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return next(customError(400, 'Genre already exists'));
    }

    const genre = await new Genre({ name }).save();

    res.status(201).json(genre);
  } catch (err) {
    console.error(`Error while creating the genre ${err}`);
    next(err);
  }
};

export const updateGenre = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const genre = await Genre.findOne({ _id: id });
    if (!genre) {
      return next(customError(404, 'Genre not found'));
    }
    // updating the genre
    genre.name = name;

    const updatedGenre = await genre.save();

    res.status(200).json(updatedGenre);
  } catch (err) {
    console.error(`Error while update the genre ${err}`);
    next(err);
  }
};

export const removeGenre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Genre.findByIdAndDelete(id);

    // if removed === null
    if (!removed) {
      return next(customError(404, 'Genre not found'));
    }

    res.status(200).json(removed);
  } catch (err) {
    console.error(`Error while delete genre ${err}`);
    next(err);
  }
};

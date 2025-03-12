import { Genre } from '../models';
import { error } from '../utils';

export const createGenre = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(error(400, 'Name is required'));
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      return next(error(400, 'Genre already exists'));
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
      return next(error(404, 'Genre not found'));
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
      return next(error(404, 'Genre not found'));
    }

    res.status(200).json(removed);
  } catch (err) {
    console.error(`Error while delete genre ${err}`);
    next(err);
  }
};

export const fetchGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find({});
    // if no genres it will return []
    res.status(200).json(genres);
  } catch (err) {
    console.error(`Error while fetch genres ${err}`);
    next(err);
  }
};

export const readGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    if (!genre) {
      return next(error(404, 'Genre not found'));
    }

    res.status(200).json(genre);
  } catch (err) {
    console.error(`Error while reading specific genre ${err}`);
    next(err);
  }
};

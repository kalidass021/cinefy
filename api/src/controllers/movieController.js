import Movie from '../models/Movie.js';
import customError from '../utils/customError.js';

export const createMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (err) {
    console.error(`Error while movie creation ${err}`);
    next(err);
  }
};

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    console.error(`Error while fetching all movies ${err}`);
    next(err);
  }
};

export const getSpecificMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const specificMovie = await Movie.findById(id);
    if (!specificMovie) {
      return next(customError(404, 'Movie not found'));
    }

    res.status(200).json(specificMovie);
  } catch (err) {
    console.error(`Error while fetching specific movie ${err}`);
    next(err);
  }
};

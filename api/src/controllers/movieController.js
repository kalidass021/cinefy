import Movie from '../models/Movie.js';

export const createMovie = async (req, res, next) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();

        res.status(201).json(savedMovie);
    } catch (err) {
        console.error(`Error while movie creation ${err}`);
        next(err);
    }
}

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

export const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieToBeUpdated = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(id, movieToBeUpdated, {
      new: true,
    });

    if (!updatedMovie) {
      return next(customError(404, 'Movie not found'));
    }

    res.status(200).json(updatedMovie);
  } catch (err) {
    console.error(`Error while updating the movie ${err}`);
    next(err);
  }
};

export const addMovieReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: movieId } = req.params;
    // get the userId and username from the req object
    // to check, wheather the user is already reviewd the movie or not
    const { _id: userId, username } = req.user;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return next(customError(404, 'Movie not found'));
    }

    // check if the movie is already reviewed or not
    const alreadyReviewed = movie?.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return next(customError(400, 'Movie already reviewd'));
    }

    const review = {
      name: username,
      rating: Number(rating),
      comment,
      user: userId,
    };

    movie.reviews.push(review);
    // calculate some more properties to review obj
    // total number of reviews
    const totalReviews = movie.reviews.length;
    // avg rating
    const avgRating =
      movie.reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews;

    // add calculated properties to review obj
    movie.numOfReviews = totalReviews;
    movie.rating = avgRating;

    await movie.save();

    res.status(201).json({ message: 'Review added' });
  } catch (err) {
    console.error(`Error while adding the review ${err}`);
    next(err);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
      return next(customError(404, 'Movie not found'));
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(`Error while delete a movie ${err}`);
    next(err);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const { reviewId } = req.body;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return next(customError(404, 'Movie not found'));
    }
    // find the review index
    const reviewIndex = movie.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return next(customError(404, 'Review not found'));
    }

    // removing the review
    movie.reviews.splice(reviewIndex, 1);

    // calculate some more properties to update in reviews obj
    // total number of reviews
    const totalReviews = movie.reviews.length;
    // avg rating
    const avgRating =
      totalReviews > 0
        ? movie.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
          totalReviews
        : 0;

    // add calculated properties to review obj
    // updating the number of reviews and avg rating
    movie.numOfReviews = totalReviews;
    movie.rating = avgRating;

    await movie.save();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(`Error while deleting the review ${err}`);
    next(err);
  }
};

export const getNewMovies = async (req, res, next) => {
  try {
    const newMovies = await Movie.find().sort({ year: -1 }).limit(10);
    res.status(200).json(newMovies);
  } catch (err) {
    console.error(`Error while fetching new movies ${err}`);
    next(err);
  }
};

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const topRatedMovies = await Movie.find().sort({ rating: -1 }).limit(10);
    res.status(200).json(topRatedMovies);
  } catch (err) {
    console.error(`Error while fetching top rated movies ${err}`);
    next(err);
  }
};

export const getRandomMovies = async (req, res, next) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    // it fetches 10 random documents from the Movie collection

    res.status(200).json(randomMovies);
  } catch (err) {
    console.error(`Error while fetching random movies ${err}`);
    next(err);
  }
};

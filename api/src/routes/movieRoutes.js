import { Router } from 'express';
import { MOVIE_ENDPOINTS } from '../constants/appConstants';
// controllers
import * as movieController from '../controllers/movieController';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';
import { checkId } from '../middlewares';

const router = Router();

// mongo db object id regex pattern will ensure /:id routes only executed only for objectIds not for other strings
// if we won't add this /:id route will get executed for /new
// the other way to fix this issue was changing the order of the routes,
// but that's not a potential fix

// public routes
router.get(MOVIE_ENDPOINTS.GET_ALL_MOVIES, movieController.getAllMovies);
router.get(
  MOVIE_ENDPOINTS.GET_SPECIFIC_MOVIE,
  movieController.getSpecificMovie
);
router.get(MOVIE_ENDPOINTS.GET_NEW_MOVIES, movieController.getNewMovies);
router.get(
  MOVIE_ENDPOINTS.GET_TOP_RATED_MOVIES,
  movieController.getTopRatedMovies
);
router.get(MOVIE_ENDPOINTS.GET_RANDOM_MOVIES, movieController.getRandomMovies);

// restricted routes
// apply authenticate middleware to all below routes
router.use(authenticate);
router.post(
  MOVIE_ENDPOINTS.ADD_MOVIE_REVIEW,
  checkId,
  movieController.addMovieReview
);

// admin routes
// apply authorizeAdmin middleware to all below routes
router.use(authorizeAdmin);
router.post(MOVIE_ENDPOINTS.CREATE_MOVIE, movieController.createMovie);
router.put(MOVIE_ENDPOINTS.UPDATE_MOVIE, movieController.updateMovie);
router.delete(MOVIE_ENDPOINTS.DELETE_MOVIE, movieController.deleteMovie);
router.delete(MOVIE_ENDPOINTS.DELETE_REVIEW, movieController.deleteReview);

export default router;

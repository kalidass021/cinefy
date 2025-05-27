import { Router } from 'express';
// controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  addMovieReview,
  deleteMovie,
  deleteReview,
  getNewMovies,
  getTopRatedMovies,
  getRandomMovies,
} from '../controllers/movieController';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';
import { checkId } from '../middlewares';

const router = Router();

// mongo db object id regex pattern
const objectIdPattern = '([0-9a-fA-F]{24})';
// this will ensure /:id routes only executed only for objectIds not for other strings
// if we won't add this /:id route will get executed for /new
// the other way to fix this issue was changing the order of the routes,
// but that's not a potential fix

// public routes
router.get('/', getAllMovies);
router.get(`/:id${objectIdPattern}`, getSpecificMovie);
router.get('/new', getNewMovies);
router.get('/top-rated', getTopRatedMovies);
router.get('/random', getRandomMovies);

// restricted routes
// apply authenticate middleware to all below routes
router.use(authenticate);
router.post('/:id/review', checkId, addMovieReview);

// admin routes
router.post('/', authorizeAdmin, createMovie);
router.put(`/:id${objectIdPattern}`, authorizeAdmin, updateMovie);
router.delete(
  `/:id${objectIdPattern}`,
  authorizeAdmin,
  deleteMovie
);
router.delete(
  `/:id${objectIdPattern}/review`,
  authorizeAdmin,
  deleteReview
);

export default router;

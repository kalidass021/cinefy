import { Router } from 'express';
// controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteReview,
  getNewMovies,
  getTopRatedMovies,
  getRandomMovies,
} from '../controllers/movieController.js';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';

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
router.post('/:id/review', authenticate, checkId, movieReview);

// admin routes
router.post('/', authenticate, authorizeAdmin, createMovie);
router.put(`/:id${objectIdPattern}`, authenticate, authorizeAdmin, updateMovie);
router.delete(`/:id${objectIdPattern}`, authenticate, authorizeAdmin, deleteMovie);
router.delete(`/:id${objectIdPattern}/review`, authenticate, authorizeAdmin, deleteReview);

export default router;

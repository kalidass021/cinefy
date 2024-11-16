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
  getNewMovies
} from '../controllers/movieController.js';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';

const router = Router();

// public routes
router.get('/', getAllMovies);
router.get('/new', getNewMovies);
router.get('/:id', getSpecificMovie);

// restricted routes
router.post('/:id/review', authenticate, checkId, movieReview);

// admin routes
router.post('/', authenticate, authorizeAdmin, createMovie);
router.put('/:id', authenticate, authorizeAdmin, updateMovie);
router.delete('/:id', authenticate, authorizeAdmin, deleteMovie);
router.delete('/:id/review', authenticate, authorizeAdmin, deleteReview);

export default router;

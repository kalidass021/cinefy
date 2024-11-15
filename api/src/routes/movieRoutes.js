import { Router } from 'express';
// controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
} from '../controllers/movieController.js';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

// public routes
router.get('/', getAllMovies);
router.get('/:id', getSpecificMovie);
// restricted routes

// admin routes
router.post('/', authenticate, authorizeAdmin, createMovie);
router.put('/:id', authenticate, authorizeAdmin, updateMovie);

export default router;

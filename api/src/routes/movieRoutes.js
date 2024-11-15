import { Router } from 'express';
// controllers
import { createMovie } from '../controllers/movieController.js';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

// public routes
// router.get('/all', getAllMovies);
// restricted routes

// admin routes
router.post('/', authenticate, authorizeAdmin, createMovie);

export default router;

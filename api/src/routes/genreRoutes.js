import {Router} from 'express';
// controllers
import { createGenre, updateGenre, removeGenre, listGenres, readGenre } from '../controllers/genreController.js';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

router.post('/', authenticate, authorizeAdmin, createGenre);
router.put('/:id', authenticate, authorizeAdmin, updateGenre);
router.delete('/:id', authenticate, authorizeAdmin, removeGenre);
router.get('/genres', listGenres);
router.get('/:id', readGenre);

export default router;
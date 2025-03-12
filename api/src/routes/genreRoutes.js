import {Router} from 'express';
// controllers
import { createGenre, updateGenre, removeGenre, fetchGenres, readGenre } from '../controllers/genreController';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

router.post('/', authenticate, authorizeAdmin, createGenre);
router.put('/:id', authenticate, authorizeAdmin, updateGenre);
router.delete('/:id', authenticate, authorizeAdmin, removeGenre);
router.get('/genres', fetchGenres);
router.get('/:id', readGenre);

export default router;
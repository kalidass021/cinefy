import {Router} from 'express';
// controllers
import { createGenre, updateGenre, removeGenre, listGenres, readGenre } from '../controllers/genreController.js';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

router.route('/').post(authenticate, authorizeAdmin, createGenre);
router.route('/:id').put(authenticate, authorizeAdmin, updateGenre);
router.route('/:id').delete(authenticate, authorizeAdmin, removeGenre);
router.route('/genres').get(listGenres);
router.route('/:id').get(readGenre);

export default router;
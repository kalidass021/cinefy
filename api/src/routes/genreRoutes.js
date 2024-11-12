import {Router} from 'express';
// controllers
import { createGenre, updateGenre, removeGenre } from '../controllers/genreController.js';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

router.route('/').post(authenticate, authorizeAdmin, createGenre);
router.route('/:id').put(authenticate, authorizeAdmin, updateGenre);
router.route('/:id').delete(authenticate, authorizeAdmin, removeGenre);

export default router;
import {Router} from 'express';
// controllers
import { createGenre, updateGenre, removeGenre, fetchGenres, readGenre } from '../controllers/genreController';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

router.get('/genres', fetchGenres);
router.get('/:id', readGenre);
// apply authenticated and authorizeAmin middlewares for below routes
router.use(authenticate, authorizeAdmin);

router.post('/', createGenre);
router.put('/:id', updateGenre);
router.delete('/:id', removeGenre);

export default router;
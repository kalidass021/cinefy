import {Router} from 'express';
// controllers
import * as genreController from '../controllers/genreController';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

router.get('/genres', genreController.fetchGenres);
router.get('/:id', genreController.readGenre);
// apply authenticated and authorizeAmin middlewares for below routes
router.use(authenticate, authorizeAdmin);

router.post('/', genreController.createGenre);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.removeGenre);

export default router;
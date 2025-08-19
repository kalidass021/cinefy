import { Router } from 'express';
import { GENRE_ENDPOINTS } from '../constants';
// controllers
import * as genreController from '../controllers/genreController';

// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

router.get(GENRE_ENDPOINTS.FETCH_GENRES, genreController.fetchGenres);
router.get(GENRE_ENDPOINTS.READ_GENRE, genreController.readGenre);
// apply authenticated and authorizeAmin middlewares for below routes
router.use(authenticate, authorizeAdmin);

router.post(GENRE_ENDPOINTS.CREATE_GENRE, genreController.createGenre);
router.put(GENRE_ENDPOINTS.UPDATE_GENRE, genreController.updateGenre);
router.delete(GENRE_ENDPOINTS.REMOVE_GENRE, genreController.removeGenre);

export default router;

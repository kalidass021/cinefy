import { Router } from 'express';
// controllers
import * as movieController from '../controllers/movieController';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';
import { checkId } from '../middlewares';

const router = Router();

// mongo db object id regex pattern
const objectIdPattern = '([0-9a-fA-F]{24})';
// this will ensure /:id routes only executed only for objectIds not for other strings
// if we won't add this /:id route will get executed for /new
// the other way to fix this issue was changing the order of the routes,
// but that's not a potential fix

// public routes
router.get('/', movieController.getAllMovies);
router.get(`/:id${objectIdPattern}`, movieController.getSpecificMovie);
router.get('/new', movieController.getNewMovies);
router.get('/top-rated', movieController.getTopRatedMovies);
router.get('/random', movieController.getRandomMovies);

// restricted routes
// apply authenticate middleware to all below routes
router.use(authenticate);
router.post('/:id/review', checkId, movieController.addMovieReview);

// admin routes
// apply authorizeAdmin middleware to all below routes
router.use(authorizeAdmin);
router.post('/', movieController.createMovie);
router.put(`/:id${objectIdPattern}`, movieController.updateMovie);
router.delete(
  `/:id${objectIdPattern}`,
  movieController.deleteMovie
);
router.delete(
  `/:id${objectIdPattern}/review`,
  movieController.deleteReview
);

export default router;

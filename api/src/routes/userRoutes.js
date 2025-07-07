import { Router } from 'express';
// controllers
import {
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from '../controllers/userController';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

// apply authenticated middleware to all below routes
router.use(authenticate);

router.get('/', authorizeAdmin, getAllUsers);
router
  .route('/profile')
  .get(getCurrentUserProfile)
  .put(updateCurrentUserProfile);

export default router;

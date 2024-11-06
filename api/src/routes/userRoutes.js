import { Router } from 'express';
// controllers
import {
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from '../controllers/userController.js';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getAllUsers);
router
  .route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

export default router;

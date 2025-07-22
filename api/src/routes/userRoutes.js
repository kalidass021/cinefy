import { Router } from 'express';
import { USER_ENDPOINTS } from '../constants/appConstants';
// controllers
import * as userController from '../controllers/userController';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

// apply authenticated middleware to all below routes
router.use(authenticate);

router.get(
  USER_ENDPOINTS.GET_ALL_USERS,
  authorizeAdmin,
  userController.getAllUsers
);
router
  .route(USER_ENDPOINTS.CURRENT_USER_PROFILE)
  .get(userController.getCurrentUserProfile)
  .put(userController.updateCurrentUserProfile);

export default router;

import { Router } from 'express';
// controllers
import * as userController from '../controllers/userController';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares';

const router = Router();

// apply authenticated middleware to all below routes
router.use(authenticate);

router.get('/', authorizeAdmin, userController.getAllUsers);
router
  .route('/profile')
  .get(userController.getCurrentUserProfile)
  .put(userController.updateCurrentUserProfile);

export default router;

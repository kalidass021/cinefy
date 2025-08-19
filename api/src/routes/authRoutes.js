import { Router } from 'express';
import { AUTH_ENDPOINTS } from '../constants';
// controllers
import * as authController from '../controllers/authController';

const router = Router();

router.post(AUTH_ENDPOINTS.SIGNUP, authController.signup);
router.post(AUTH_ENDPOINTS.SIGNIN, authController.signin);
router.post(AUTH_ENDPOINTS.SIGNOUT, authController.signoutCurrentUser);

export default router;

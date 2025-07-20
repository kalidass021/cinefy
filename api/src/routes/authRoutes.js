import { Router } from 'express';
import {ROUTES} from '../constants/appConstants';
// controllers
import * as authController from '../controllers/authController';

const router = Router();

router.post(ROUTES.AUTH_ENDPOINTS.SIGNUP, authController.signup);
router.post(ROUTES.AUTH_ENDPOINTS.SIGNIN, authController.signin);
router.post(ROUTES.AUTH_ENDPOINTS.SIGNOUT, authController.signoutCurrentUser);

export default router;

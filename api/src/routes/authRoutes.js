import { Router } from 'express';
// controllers
import * as authController from '../controllers/authController';

const router = Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signoutCurrentUser);

export default router;

import { Router } from 'express';
// controllers
import { signup, signin, signoutCurrentUser } from '../controllers/authController.js';

const router = Router();

router.route('/').post(signup);
router.post('/signin', signin);
router.post('/signout', signoutCurrentUser);

export default router;

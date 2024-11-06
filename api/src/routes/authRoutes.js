import { Router } from 'express';
// controllers
import { signup, signin } from '../controllers/authController.js';

const router = Router();

router.route('/').post(signup);
router.post('/signin', signin);

export default router;

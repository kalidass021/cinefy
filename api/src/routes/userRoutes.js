import { Router } from 'express';
// controllers
import { getAllUsers, getCurrentUserProfile } from '../controllers/userController.js';
// middlewares
import { authenticate, authorizeAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.get('/profile', authenticate, getCurrentUserProfile);

export default router;

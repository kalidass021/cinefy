import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';

const router = Router();
router.post('/', uploadController.uploadImage);

export default router;

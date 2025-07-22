import { Router } from 'express';
import { UPLOAD_ENDPOINTS } from '../constants/appConstants';
import * as uploadController from '../controllers/uploadController';

const router = Router();
router.post(UPLOAD_ENDPOINTS.UPLOAD_IMAGE, uploadController.uploadImage);

export default router;

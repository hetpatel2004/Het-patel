import express from 'express';
import { getProfileData, updateProfileData } from '../controllers/profileController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProfileData);
router.put('/', verifyAdminToken, updateProfileData);

export default router;

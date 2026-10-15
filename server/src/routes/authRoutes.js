import express from 'express';
import { adminLogin, verifySession } from '../controllers/authController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/verify', verifyAdminToken, verifySession);

export default router;

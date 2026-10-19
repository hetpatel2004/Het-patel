import express from 'express';
import {
  recordVisit,
  getAnalyticsStats,
  deleteVisitorRecord,
  clearAnalyticsLogs,
} from '../controllers/analyticsController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public silent tracking endpoint (no cookies, non-blocking)
router.post('/visit', recordVisit);

// Protected Admin Studio routes
router.get('/stats', verifyAdminToken, getAnalyticsStats);
router.delete('/:id', verifyAdminToken, deleteVisitorRecord);
router.delete('/', verifyAdminToken, clearAnalyticsLogs);

export default router;

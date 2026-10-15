import express from 'express';
import {
  createContact,
  getContacts,
  changeContactStatus,
  removeContact,
} from '../controllers/contactController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public inquiry submission (rate-limited and sanitized)
router.post('/', createContact);

// Protected Admin Inquiry Management routes
router.get('/', verifyAdminToken, getContacts);
router.patch('/:id/status', verifyAdminToken, changeContactStatus);
router.delete('/:id', verifyAdminToken, removeContact);

export default router;

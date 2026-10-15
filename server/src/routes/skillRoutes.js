import express from 'express';
import {
  getSkills,
  addNewSkill,
  editSkill,
  removeSkill,
  createCategory,
} from '../controllers/skillController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', verifyAdminToken, addNewSkill);
router.put('/', verifyAdminToken, editSkill);
router.delete('/', verifyAdminToken, removeSkill);
router.post('/category', verifyAdminToken, createCategory);

export default router;

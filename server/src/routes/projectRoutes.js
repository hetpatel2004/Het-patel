import express from 'express';
import {
  getProjects,
  createProject,
  editProject,
  removeProject,
} from '../controllers/projectController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', verifyAdminToken, createProject);
router.put('/:id', verifyAdminToken, editProject);
router.delete('/:id', verifyAdminToken, removeProject);

export default router;

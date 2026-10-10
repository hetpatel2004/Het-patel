import Project, { defaultProjects } from '../models/Project.js';
import { getDbStatus } from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const count = await Project.countDocuments();
      if (count === 0) {
        await Project.insertMany(defaultProjects);
      }
      const projects = await Project.find().sort({ order: 1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    } else {
      return res.status(200).json({ success: true, count: defaultProjects.length, data: defaultProjects });
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(200).json({ success: true, count: defaultProjects.length, data: defaultProjects });
  }
};

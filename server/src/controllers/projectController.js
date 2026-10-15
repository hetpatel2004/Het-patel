import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} from '../data/dbStore.js';
import Project from '../models/Project.js';
import { getDbStatus } from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      try {
        const dbProjects = await Project.find().sort({ order: 1, createdAt: 1 });
        if (dbProjects && dbProjects.length > 0) {
          const mapped = dbProjects.map((p) => ({
            id: p._id.toString(),
            number: p.number,
            title: p.title,
            subtitle: p.subtitle || '',
            domain: p.domain || '',
            category: p.category || 'Live Production Deployment',
            description: p.description || '',
            tags: p.tags || [],
            landingImg: p.landingImg || '/ambika-landing.png',
            fullImg: p.fullImg || '/ambika-full.png',
            liveUrl: p.liveUrl || '#',
            githubUrl: p.githubUrl || 'https://github.com/hetpatel2004',
            accentColor: p.accentColor || '#F59E0B',
            order: p.order || 0,
          }));
          return res.status(200).json({
            success: true,
            count: mapped.length,
            data: mapped,
          });
        }
      } catch (dbErr) {
        console.warn('[MongoDB Project Fetch Warning]', dbErr.message);
      }
    }

    const projects = getAllProjects();
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const localProject = addProject(req.body);

    const { connected } = getDbStatus();
    let dbProject = null;
    if (connected) {
      try {
        dbProject = await Project.create(req.body);
      } catch (dbErr) {
        console.warn('[MongoDB Project Create Warning]', dbErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: dbProject ? { ...localProject, id: dbProject._id.toString() } : localProject,
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return res.status(500).json({ success: false, message: 'Failed to create project' });
  }
};

export const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = updateProject(id, req.body);

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Project.findByIdAndUpdate(id, req.body, { new: true });
      } catch {
        // ID may belong to local JSON fallback store
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated || req.body,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project' });
  }
};

export const removeProject = async (req, res) => {
  try {
    const { id } = req.params;
    deleteProject(id);

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Project.findByIdAndDelete(id);
      } catch {
        // ID may belong to local JSON fallback store
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
};

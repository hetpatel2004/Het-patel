import {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} from '../data/dbStore.js';

export const getProjects = async (req, res) => {
  try {
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
    const project = addProject(req.body);
    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
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
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project' });
  }
};

export const removeProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
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

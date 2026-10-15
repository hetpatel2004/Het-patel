import {
  getSkillGroups,
  addSkill,
  updateSkill,
  deleteSkill,
  addSkillCategory,
} from '../data/dbStore.js';

export const getSkills = async (req, res) => {
  try {
    const groups = getSkillGroups();
    return res.status(200).json({
      success: true,
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch skills' });
  }
};

export const addNewSkill = async (req, res) => {
  try {
    const { categoryId, skillName } = req.body;
    if (!categoryId || !skillName) {
      return res.status(400).json({ success: false, message: 'categoryId and skillName are required' });
    }
    const updatedGroup = addSkill(categoryId, skillName);
    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Skill added successfully',
      data: updatedGroup,
    });
  } catch (error) {
    console.error('Error adding skill:', error);
    return res.status(500).json({ success: false, message: 'Failed to add skill' });
  }
};

export const editSkill = async (req, res) => {
  try {
    const { categoryId, oldSkillName, newSkillName } = req.body;
    if (!categoryId || !oldSkillName || !newSkillName) {
      return res.status(400).json({ success: false, message: 'categoryId, oldSkillName, and newSkillName are required' });
    }
    const updatedGroup = updateSkill(categoryId, oldSkillName, newSkillName);
    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: 'Skill or category not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: updatedGroup,
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({ success: false, message: 'Failed to update skill' });
  }
};

export const removeSkill = async (req, res) => {
  try {
    const { categoryId, skillName } = req.body;
    if (!categoryId || !skillName) {
      return res.status(400).json({ success: false, message: 'categoryId and skillName are required' });
    }
    const updatedGroup = deleteSkill(categoryId, skillName);
    if (!updatedGroup) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: updatedGroup,
    });
  } catch (error) {
    console.error('Error removing skill:', error);
    return res.status(500).json({ success: false, message: 'Failed to remove skill' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { categoryName, shortLabel } = req.body;
    if (!categoryName) {
      return res.status(400).json({ success: false, message: 'categoryName is required' });
    }
    const newCategory = addSkillCategory(categoryName, shortLabel);
    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

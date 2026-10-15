import {
  getSkillGroups,
  addSkill,
  updateSkill,
  deleteSkill,
  addSkillCategory,
} from '../data/dbStore.js';
import Skill from '../models/Skill.js';
import { getDbStatus } from '../config/db.js';

export const getSkills = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      try {
        const dbSkills = await Skill.find().sort({ createdAt: 1 });
        if (dbSkills && dbSkills.length > 0) {
          const mapped = dbSkills.map((s, idx) => ({
            id: s._id.toString(),
            category: s.category,
            shortLabel: s.shortLabel || `0${idx + 1}`,
            skills: s.skills || [],
          }));
          return res.status(200).json({
            success: true,
            count: mapped.length,
            data: mapped,
          });
        }
      } catch (dbErr) {
        console.warn('[MongoDB Skill Fetch Warning]', dbErr.message);
      }
    }

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

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Skill.findByIdAndUpdate(categoryId, { $addToSet: { skills: skillName } });
      } catch {
        // categoryId may be from local store
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Skill added successfully',
      data: updatedGroup || { categoryId, skillName },
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

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Skill.findOneAndUpdate(
          { _id: categoryId, skills: oldSkillName },
          { $set: { 'skills.$': newSkillName } }
        );
      } catch {
        // categoryId may be from local store
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: updatedGroup || { categoryId, newSkillName },
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

    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Skill.findByIdAndUpdate(categoryId, { $pull: { skills: skillName } });
      } catch {
        // categoryId may be from local store
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: updatedGroup || { categoryId, skillName },
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

    const { connected } = getDbStatus();
    let dbSkill = null;
    if (connected) {
      try {
        dbSkill = await Skill.create({
          category: categoryName,
          shortLabel: shortLabel || '',
          skills: [],
        });
      } catch (dbErr) {
        console.warn('[MongoDB Skill Category Create Warning]', dbErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: dbSkill ? { ...newCategory, id: dbSkill._id.toString() } : newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ success: false, message: 'Failed to create category' });
  }
};

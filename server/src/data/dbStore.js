import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultProfile, defaultProjects, defaultSkillGroups, defaultInquiries } from './defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../../server/data');
const storeFilePath = path.join(dataDir, 'store.json');

// Ensure directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// In-memory cache
let inMemoryStore = {
  profile: defaultProfile,
  projects: defaultProjects,
  skillGroups: defaultSkillGroups,
  inquiries: defaultInquiries,
};

// Load from disk if file exists
try {
  if (fs.existsSync(storeFilePath)) {
    const rawData = fs.readFileSync(storeFilePath, 'utf8');
    const parsed = JSON.parse(rawData);
    inMemoryStore = {
      profile: { ...defaultProfile, ...(parsed.profile || {}) },
      projects: parsed.projects && parsed.projects.length ? parsed.projects : defaultProjects,
      skillGroups: parsed.skillGroups && parsed.skillGroups.length ? parsed.skillGroups : defaultSkillGroups,
      inquiries: parsed.inquiries && parsed.inquiries.length ? parsed.inquiries : defaultInquiries,
    };
  } else {
    // Write defaults to file
    fs.writeFileSync(storeFilePath, JSON.stringify(inMemoryStore, null, 2), 'utf8');
  }
} catch (err) {
  console.warn('[Store] Warning reading store file, using in-memory defaults:', err.message);
}

const saveStore = () => {
  try {
    fs.writeFileSync(storeFilePath, JSON.stringify(inMemoryStore, null, 2), 'utf8');
  } catch (err) {
    console.error('[Store] Failed to persist data to disk:', err.message);
  }
};

export const getStoreData = () => inMemoryStore;

// PROFILE OPERATIONS
export const getProfile = () => inMemoryStore.profile;

export const updateProfile = (updatedProfile) => {
  inMemoryStore.profile = {
    ...inMemoryStore.profile,
    ...updatedProfile,
    updatedAt: new Date().toISOString(),
  };
  saveStore();
  return inMemoryStore.profile;
};

// PROJECTS OPERATIONS
export const getAllProjects = () => inMemoryStore.projects;

export const addProject = (projectData) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    number: projectData.number || String(inMemoryStore.projects.length + 1).padStart(2, '0'),
    title: projectData.title || 'New Project',
    subtitle: projectData.subtitle || '',
    domain: projectData.domain || '',
    category: projectData.category || 'Web Application',
    description: projectData.description || '',
    tags: Array.isArray(projectData.tags) ? projectData.tags : (projectData.tags ? projectData.tags.split(',').map(t => t.trim()) : []),
    landingImg: projectData.landingImg || '/ambika-landing.png',
    fullImg: projectData.fullImg || '/ambika-full.png',
    liveUrl: projectData.liveUrl || '#',
    githubUrl: projectData.githubUrl || 'https://github.com/hetpatel2004',
    accentColor: projectData.accentColor || '#B600A8',
    order: projectData.order !== undefined ? Number(projectData.order) : inMemoryStore.projects.length + 1,
    createdAt: new Date().toISOString(),
  };

  inMemoryStore.projects.push(newProject);
  saveStore();
  return newProject;
};

export const updateProject = (id, updatedFields) => {
  const idx = inMemoryStore.projects.findIndex(p => p.id === id || p._id === id);
  if (idx === -1) return null;

  if (typeof updatedFields.tags === 'string') {
    updatedFields.tags = updatedFields.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  inMemoryStore.projects[idx] = {
    ...inMemoryStore.projects[idx],
    ...updatedFields,
    updatedAt: new Date().toISOString(),
  };

  saveStore();
  return inMemoryStore.projects[idx];
};

export const deleteProject = (id) => {
  const initialLength = inMemoryStore.projects.length;
  inMemoryStore.projects = inMemoryStore.projects.filter(p => p.id !== id && p._id !== id);
  if (inMemoryStore.projects.length !== initialLength) {
    saveStore();
    return true;
  }
  return false;
};

// SKILLS OPERATIONS
export const getSkillGroups = () => inMemoryStore.skillGroups;

export const addSkill = (categoryId, skillName) => {
  const group = inMemoryStore.skillGroups.find(g => g.id === categoryId);
  if (!group) return null;
  const trimmed = skillName.trim();
  if (!trimmed) return null;

  if (!group.skills.includes(trimmed)) {
    group.skills.push(trimmed);
    saveStore();
  }
  return group;
};

export const updateSkill = (categoryId, oldSkillName, newSkillName) => {
  const group = inMemoryStore.skillGroups.find(g => g.id === categoryId);
  if (!group) return null;

  const idx = group.skills.indexOf(oldSkillName);
  if (idx === -1) return null;

  group.skills[idx] = newSkillName.trim();
  saveStore();
  return group;
};

export const deleteSkill = (categoryId, skillName) => {
  const group = inMemoryStore.skillGroups.find(g => g.id === categoryId);
  if (!group) return null;

  group.skills = group.skills.filter(s => s !== skillName);
  saveStore();
  return group;
};

export const addSkillCategory = (categoryName, shortLabel) => {
  const newId = String(inMemoryStore.skillGroups.length + 1).padStart(2, '0');
  const newGroup = {
    id: newId,
    category: categoryName.trim(),
    shortLabel: shortLabel ? shortLabel.trim() : categoryName.trim(),
    skills: [],
  };

  inMemoryStore.skillGroups.push(newGroup);
  saveStore();
  return newGroup;
};

// INQUIRIES / CONTACT LEADS OPERATIONS
export const getAllInquiries = () => {
  return inMemoryStore.inquiries || [];
};

export const addInquiry = (inquiryData) => {
  if (!inMemoryStore.inquiries) inMemoryStore.inquiries = [];

  // Sanitize strings to prevent HTML/XSS injection
  const sanitize = (str) => (str ? String(str).replace(/[<>]/g, '').trim() : '');

  const newInquiry = {
    id: `inq-${Date.now()}`,
    name: sanitize(inquiryData.name) || 'Anonymous Client',
    email: sanitize(inquiryData.email),
    phone: sanitize(inquiryData.phone) || '',
    service: sanitize(inquiryData.service) || 'General Project Inquiry',
    budget: sanitize(inquiryData.budget) || 'Flexible',
    timeline: sanitize(inquiryData.timeline) || '2-4 weeks',
    message: sanitize(inquiryData.message),
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  inMemoryStore.inquiries.unshift(newInquiry);
  saveStore();
  return newInquiry;
};

export const updateInquiryStatus = (id, status) => {
  if (!inMemoryStore.inquiries) return null;
  const inq = inMemoryStore.inquiries.find(i => i.id === id || i._id === id);
  if (!inq) return null;
  inq.status = status;
  inq.updatedAt = new Date().toISOString();
  saveStore();
  return inq;
};

export const deleteInquiry = (id) => {
  if (!inMemoryStore.inquiries) return false;
  const initialLength = inMemoryStore.inquiries.length;
  inMemoryStore.inquiries = inMemoryStore.inquiries.filter(i => i.id !== id && i._id !== id);
  if (inMemoryStore.inquiries.length !== initialLength) {
    saveStore();
    return true;
  }
  return false;
};

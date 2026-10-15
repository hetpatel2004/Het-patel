import Project from '../models/Project.js';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Contact from '../models/Contact.js';
import { getStoreData } from '../data/dbStore.js';

export const seedAtlasIfEmpty = async () => {
  try {
    const store = getStoreData();

    // 1. Migrate / Seed Projects from store.json to Atlas
    const projCount = await Project.countDocuments();
    if (projCount === 0 && store.projects && store.projects.length > 0) {
      console.log('[Atlas Sync] Migrating existing projects from store.json to MongoDB Atlas...');
      const cleanProjects = store.projects.map((p) => ({
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
      await Project.insertMany(cleanProjects);
      console.log('[Atlas Sync] Successfully migrated', cleanProjects.length, 'projects to MongoDB Atlas.');
    }

    // 2. Migrate / Seed Profile from store.json to Atlas
    const profCount = await Profile.countDocuments();
    if (profCount === 0 && store.profile) {
      console.log('[Atlas Sync] Migrating profile details to MongoDB Atlas...');
      await Profile.create(store.profile);
      console.log('[Atlas Sync] Successfully migrated Het Patel profile to MongoDB Atlas.');
    }

    // 3. Migrate / Seed Skills from store.json to Atlas
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0 && store.skillGroups && store.skillGroups.length > 0) {
      console.log('[Atlas Sync] Migrating skill categories to MongoDB Atlas...');
      const cleanSkills = store.skillGroups.map((g) => ({
        category: g.category,
        shortLabel: g.shortLabel || '',
        skills: g.skills || [],
      }));
      await Skill.insertMany(cleanSkills);
      console.log('[Atlas Sync] Successfully migrated', cleanSkills.length, 'skill categories to MongoDB Atlas.');
    }

    // 4. Migrate / Seed existing Inquiries from store.json to Atlas
    const contactCount = await Contact.countDocuments();
    if (contactCount === 0 && store.inquiries && store.inquiries.length > 0) {
      console.log('[Atlas Sync] Migrating existing contact inquiries to MongoDB Atlas...');
      const cleanContacts = store.inquiries.map((i) => ({
        name: i.name,
        email: i.email,
        phone: i.phone || '',
        service: i.service || 'General Inquiry',
        budget: i.budget || 'Not specified',
        timeline: i.timeline || 'Flexible',
        message: i.message,
        status: i.status || 'new',
        notes: i.notes || '',
      }));
      await Contact.insertMany(cleanContacts);
      console.log('[Atlas Sync] Successfully migrated', cleanContacts.length, 'inquiries to MongoDB Atlas.');
    }
  } catch (err) {
    console.warn('[Atlas Sync Warning]:', err.message);
  }
};

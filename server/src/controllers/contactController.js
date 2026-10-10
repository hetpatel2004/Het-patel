import Contact, { memoryContacts } from '../models/Contact.js';
import { getDbStatus } from '../config/db.js';

export const createContact = async (req, res) => {
  try {
    const { name, email, service, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const { connected } = getDbStatus();

    let newContact;
    if (connected) {
      newContact = await Contact.create({
        name,
        email,
        service: service || 'General Inquiry',
        budget: budget || 'Flexible',
        timeline: timeline || 'Flexible',
        message,
      });
    } else {
      // In-memory fallback
      newContact = {
        _id: 'mem_' + Date.now(),
        name,
        email,
        service: service || 'General Inquiry',
        budget: budget || 'Flexible',
        timeline: timeline || 'Flexible',
        message,
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      memoryContacts.unshift(newContact);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Het Patel will be in touch shortly.',
      data: newContact,
    });
  } catch (error) {
    console.error('Error creating contact inquiry:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error while sending inquiry. Please try again.',
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: contacts.length, data: contacts });
    } else {
      return res.status(200).json({ success: true, count: memoryContacts.length, data: memoryContacts });
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ success: false, error: 'Server error fetching contacts.' });
  }
};

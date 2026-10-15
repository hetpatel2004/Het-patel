import {
  getAllInquiries,
  addInquiry,
  updateInquiryStatus,
  deleteInquiry,
} from '../data/dbStore.js';
import Contact from '../models/Contact.js';
import { getDbStatus } from '../config/db.js';

// In-memory rate-limiter: Max 5 submissions per IP every 10 minutes
const submissionTracker = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const isRateLimited = (ip) => {
  const now = Date.now();
  const history = submissionTracker.get(ip) || [];
  const recentHistory = history.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recentHistory.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissionTracker.set(ip, recentHistory);
    return true;
  }

  recentHistory.push(now);
  submissionTracker.set(ip, recentHistory);
  return false;
};

export const createContact = async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before submitting another inquiry.',
      });
    }

    const { name, email, phone, service, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name, email, and message details.',
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Save to persistent file/in-memory store
    const inquiryRecord = addInquiry({
      name,
      email,
      phone,
      service,
      budget,
      timeline,
      message,
    });

    // Also persist to MongoDB if connected
    const { connected } = getDbStatus();
    if (connected) {
      try {
        await Contact.create({
          name: inquiryRecord.name,
          email: inquiryRecord.email,
          service: inquiryRecord.service,
          budget: inquiryRecord.budget,
          timeline: inquiryRecord.timeline,
          message: inquiryRecord.message,
        });
      } catch (dbErr) {
        console.warn('[MongoDB Contact Save]', dbErr.message);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been received. Het Patel will get back to you shortly.',
      data: inquiryRecord,
    });
  } catch (error) {
    console.error('[Contact Controller Error]', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process inquiry. Please try again or message directly via WhatsApp.',
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const inquiries = getAllInquiries();
    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ success: false, error: 'Server error fetching inquiries.' });
  }
};

export const changeContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updated = updateInquiryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return res.status(500).json({ success: false, error: 'Failed to update inquiry status' });
  }
};

export const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteInquiry(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
  }
};

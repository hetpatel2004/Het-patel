import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    service: {
      type: String,
      default: 'General Inquiry',
    },
    budget: {
      type: String,
      default: 'Not specified',
    },
    timeline: {
      type: String,
      default: 'Flexible',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'replied', 'in_discussion', 'closed', 'completed'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Fallback in-memory list if MongoDB is offline
export const memoryContacts = [];

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export default Contact;

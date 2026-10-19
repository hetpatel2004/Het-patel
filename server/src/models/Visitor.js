import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      default: '',
    },
    ip: {
      type: String,
      default: '',
    },
    deviceType: {
      type: String,
      enum: ['Desktop', 'Mobile', 'Tablet', 'Unknown'],
      default: 'Desktop',
    },
    deviceModel: {
      type: String,
      default: 'Unknown Device',
    },
    os: {
      type: String,
      default: 'Unknown OS',
    },
    browser: {
      type: String,
      default: 'Unknown Browser',
    },
    screenResolution: {
      type: String,
      default: 'Unknown',
    },
    referrer: {
      type: String,
      default: 'Direct Visit',
    },
    referrerUrl: {
      type: String,
      default: '',
    },
    currentPath: {
      type: String,
      default: '/',
    },
    timezone: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'India',
    },
    city: {
      type: String,
      default: '',
    },
    visitCount: {
      type: Number,
      default: 1,
    },
    hasContacted: {
      type: Boolean,
      default: false,
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Quick index on lastVisitedAt descending for recent visitors query
visitorSchema.index({ lastVisitedAt: -1 });

const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', visitorSchema);
export default Visitor;

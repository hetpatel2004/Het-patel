import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      default: '01',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    domain: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Live Production Deployment',
    },
    description: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    landingImg: {
      type: String,
      default: '/ambika-landing.png',
    },
    fullImg: {
      type: String,
      default: '/ambika-full.png',
    },
    liveUrl: {
      type: String,
      default: '#',
    },
    githubUrl: {
      type: String,
      default: 'https://github.com/hetpatel2004',
    },
    accentColor: {
      type: String,
      default: '#F59E0B',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    col1Image1: {
      type: String,
      required: true,
    },
    col1Image2: {
      type: String,
      required: true,
    },
    col2Image: {
      type: String,
      required: true,
    },
    liveUrl: {
      type: String,
      default: '#',
    },
    techStack: {
      type: [String],
      default: [],
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

export const defaultProjects = [
  {
    number: '01',
    title: 'Online Examination System',
    category: 'MERN Stack',
    type: 'Deployed Platform',
    description: 'Deployed full-stack platform built for Silver Oak University. Features 3-tier JWT authentication (Super Admin, Admin, Student), online MCQ examinations, online code editor with live execution, AI-assisted code evaluation, and bulk CSV report management.',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    liveUrl: 'https://online-examination-sou.pages.dev/',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'AI Evaluation'],
    order: 1,
  },
  {
    number: '02',
    title: 'SecureLife Policy System',
    category: 'MERN Stack',
    type: 'Enterprise Web',
    description: 'Enterprise insurance policy management platform with dedicated Admin and Customer workflows. Supports multi-policy lifecycle (Health, Auto, Life, Home, Travel), expiration tracker, policy renewal proposals, and bulk CSV data imports with error logging.',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    liveUrl: 'https://github.com/hetpatel2004',
    techStack: ['React.js', 'Express.js', 'MongoDB', 'Mongoose', 'Framer Motion', 'JWT'],
    order: 2,
  },
  {
    number: '03',
    title: 'Education Management System',
    category: 'MERN Stack',
    type: 'Academic Platform',
    description: 'Comprehensive institutional ERP with dedicated modules for Super Admin, Counselor, Student, Finance, and Academic Management. Streamlines student enrollment, fee collection records, attendance tracking, and grading metrics.',
    col1Image1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Image2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    liveUrl: 'https://github.com/hetpatel2004',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    order: 3,
  },
];

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;

import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export const defaultServices = [
  {
    number: '01',
    title: 'MERN Stack Development',
    description: 'End-to-end full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Delivering secure, scalable, and responsive platforms with role-based access control.',
    order: 1,
  },
  {
    number: '02',
    title: 'Frontend Engineering',
    description: 'Building responsive, high-performance web applications using React.js, Tailwind CSS, Framer Motion, and modern JavaScript (ES6+), optimized across mobile and desktop devices.',
    order: 2,
  },
  {
    number: '03',
    title: 'Backend & REST APIs',
    description: 'Developing robust RESTful APIs with Node.js and Express.js, incorporating JWT authentication, bcrypt password security, data validation, and modular controller architecture.',
    order: 3,
  },
  {
    number: '04',
    title: 'Database Architecture',
    description: 'Structuring and managing relational & document databases using MongoDB and MySQL, optimizing schemas, queries, and bulk data operations with Mongoose.',
    order: 4,
  },
  {
    number: '05',
    title: 'UI/UX Design & Prototyping',
    description: 'Designing intuitive user interfaces and interactive prototypes using Figma, Canva, and modern design standards for seamless, conversion-focused digital experiences.',
    order: 5,
  },
];

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;

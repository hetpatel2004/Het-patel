export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: "MERN Stack Development",
    description: "End-to-end full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Delivering secure, scalable, and responsive platforms with role-based access control.",
  },
  {
    number: "02",
    title: "Frontend Engineering",
    description: "Building responsive, high-performance web applications using React.js, Tailwind CSS, Framer Motion, and modern JavaScript (ES6+), optimized across mobile and desktop devices.",
  },
  {
    number: "03",
    title: "Backend & REST APIs",
    description: "Developing robust RESTful APIs with Node.js and Express.js, incorporating JWT authentication, bcrypt password security, data validation, and modular controller architecture.",
  },
  {
    number: "04",
    title: "Database Architecture",
    description: "Structuring and managing relational & document databases using MongoDB and MySQL, optimizing schemas, queries, and bulk data operations with Mongoose.",
  },
  {
    number: "05",
    title: "UI/UX Design & Prototyping",
    description: "Designing intuitive user interfaces and interactive prototypes using Figma, Canva, and modern design standards for seamless, conversion-focused digital experiences.",
  },
];

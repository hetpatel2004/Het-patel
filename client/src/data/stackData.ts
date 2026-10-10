export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tooling' | 'Database & Core';
}

export const skillsData: SkillItem[] = [
  { id: '01', name: 'React.js', category: 'Frontend' },
  { id: '02', name: 'Next.js', category: 'Frontend' },
  { id: '03', name: 'TypeScript', category: 'Frontend' },
  { id: '04', name: 'Tailwind CSS', category: 'Frontend' },
  { id: '05', name: 'JavaScript (ES6+)', category: 'Frontend' },
  { id: '06', name: 'Framer Motion', category: 'Frontend' },
  { id: '07', name: 'Redux / Zustand', category: 'Frontend' },
  
  { id: '08', name: 'Node.js', category: 'Backend' },
  { id: '09', name: 'Express.js', category: 'Backend' },
  { id: '10', name: 'REST APIs', category: 'Backend' },
  { id: '11', name: 'JWT Auth', category: 'Backend' },
  { id: '12', name: 'Bcrypt Security', category: 'Backend' },
  { id: '13', name: 'API Architecture', category: 'Backend' },
  
  { id: '14', name: 'MongoDB', category: 'Database & Core' },
  { id: '15', name: 'Mongoose ORM', category: 'Database & Core' },
  { id: '16', name: 'MySQL', category: 'Database & Core' },
  { id: '17', name: 'Data Structures', category: 'Database & Core' },
  { id: '18', name: 'OOP Concepts', category: 'Database & Core' },
  
  { id: '19', name: 'Git & GitHub', category: 'Tooling' },
  { id: '20', name: 'Postman', category: 'Tooling' },
  { id: '21', name: 'VS Code', category: 'Tooling' },
  { id: '22', name: 'Figma (UI/UX)', category: 'Tooling' },
  { id: '23', name: 'Docker (Basic)', category: 'Tooling' },
  { id: '24', name: 'Vite & npm', category: 'Tooling' },
];

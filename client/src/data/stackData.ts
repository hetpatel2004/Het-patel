export interface SkillCategoryGroup {
  id: string;
  category: string;
  shortLabel: string;
  skills: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
}

export const technicalSkillsGroups: SkillCategoryGroup[] = [
  {
    id: '01',
    category: 'Frontend Technologies',
    shortLabel: 'Frontend',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'React.js',
      'Bootstrap 5',
      'React Bootstrap',
      'Framer Motion',
    ],
  },
  {
    id: '02',
    category: 'Backend Technologies',
    shortLabel: 'Backend',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Authentication',
      'Mongoose',
    ],
  },
  {
    id: '03',
    category: 'Databases',
    shortLabel: 'Databases',
    skills: [
      'MongoDB',
      'MySQL',
    ],
  },
  {
    id: '04',
    category: 'Programming Languages',
    shortLabel: 'Languages',
    skills: [
      'JavaScript',
      'Python (Basic)',
    ],
  },
  {
    id: '05',
    category: 'Version Control & Development Tools',
    shortLabel: 'Dev Tools',
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'npm',
      'XAMPP',
    ],
  },
  {
    id: '06',
    category: 'DevOps & Containerization',
    shortLabel: 'DevOps',
    skills: [
      'Docker (Basic)',
      'DevOps Fundamentals (Basic)',
    ],
  },
  {
    id: '07',
    category: 'UI/UX & Design Tools',
    shortLabel: 'UI/UX Design',
    skills: [
      'Figma',
      'Canva',
      'Photopea',
      'Icons8',
    ],
  },
  {
    id: '08',
    category: 'AI-Powered Development Tools',
    shortLabel: 'AI Tools',
    skills: [
      'ChatGPT',
      'Gemini',
      'OpenCode',
      'Codex',
    ],
  },
  {
    id: '09',
    category: 'CMS & Web Technologies',
    shortLabel: 'CMS & Web',
    skills: [
      'WordPress',
      'Responsive Web Design',
    ],
  },
  {
    id: '10',
    category: 'Core Computer Science Concepts',
    shortLabel: 'Core CS',
    skills: [
      'OOP',
      'Data Structures & Algorithms (Basic)',
      'SDLC',
    ],
  },
];

// Flattened list for backward compatibility
export const skillsData: SkillItem[] = technicalSkillsGroups.flatMap((group, groupIdx) =>
  group.skills.map((skill, skillIdx) => ({
    id: String(groupIdx * 10 + skillIdx + 1).padStart(2, '0'),
    name: skill,
    category: group.category,
  }))
);

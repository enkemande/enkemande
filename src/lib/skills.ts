export interface SkillCategory {
  category: string;
  items: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'HTML/CSS', 'Ember.js', 'JavaScript'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Go', 'Python', '.NET'],
  },
  {
    category: 'DevOps & Tools',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Linux'],
  },
  {
    category: 'Design & UX',
    items: ['Figma', 'UI/UX Design', 'Design Systems', 'Accessibility (WCAG)', 'Animation'],
  },
];

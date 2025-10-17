export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  degree: string;
  school: string;
  graduation: string;
  gpa: string;
  details: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export const EXPERIENCE: Experience[] = [
  {
    title: 'Senior Software Engineer',
    company: 'Q2 Banking',
    period: 'Sep 2021 - Present',
    location: 'Austin, TX',
    highlights: [
      'Led large-scale digital banking systems development using Ember.js, Node.js, Nginx, SQL, and Go, serving thousands of concurrent users.',
      'Engineered high-performing micro-UI frontends using React and Vue.js, improving modularity and reducing frontend load times',
      'Implemented CI/CD pipeline reducing deployment time from 45 mins to 5 mins',
      'Spearheaded design system initiative, increasing development efficiency by 35%',
    ],
  },
  {
    title: 'Senior Frontend Engineer',
    company: 'Clover ',
    period: 'May 2018 - Sep 2021',
    location: 'Austin, TX',
    highlights: [
      'Spearheaded the frontend development of customer-facing React.js micro-applications used by millions of merchants',
      'Optimized web performance, achieving 95+ Lighthouse scores consistently',
      'Built real-time features using WebSocket and Socket.io for collaborative tools',
      'Collaborated with designers to implement accessible UI components',
    ],
  },
  {
    title: 'ES Application Developer I',
    company: 'University of Houston System',
    period: 'Jun 2016 - Sep 2018',
    location: 'Houston, TX',
    highlights: [
      'Designed and built a real-time helpdesk chat system using React.js and Socket.io, reducing support response times by 40%.',
      'Modernized the FAQ knowledge base with React.js and Node.js, enhancing the student self-service experience.',
      'Participated in code reviews and pair programming sessions',
      'Completed 50+ issues and pull requests in the first year',
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'National Polytechnic',
    graduation: 'May 2015',
    gpa: '4.0',
    details: 'Specialized in Software Engineering and Web Development',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Mar 2023',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
  },
  {
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'Aug 2022',
    link: 'https://www.scrum.org/professional-scrum-master-i-psm-i',
  },
  {
    name: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    date: 'Jan 2021',
    link: 'https://frontendmasters.com/courses/advanced-react-patterns/',
  },
];

import certFullstack from '../assets/certificates/cert-fullstack.svg';
import certReact from '../assets/certificates/cert-react.svg';
import certJavascript from '../assets/certificates/cert-javascript.svg';

export const degrees = [
  {
    id: 1,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'University / Institute of Technology',
    location: 'India',
    period: '2021 - 2024',
    description:
      'Graduated with honors. Rigorous coursework covering Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Engineering, and Modern Web Architecture.',
    highlights: [
      'Top 5% Academic Standing in Computer Applications',
      'Lead Project Lead for University Web Development Club',
      'Developed multiple campus and departmental portals'
    ]
  },
  {
    id: 2,
    degree: 'Senior Secondary Education (Class XII - Science)',
    institution: 'Higher Secondary School',
    location: 'India',
    period: '2019 - 2021',
    description:
      'Major subjects: Mathematics, Physics, Chemistry, and Computer Science. Built a strong foundation in mathematical logic, algorithmic problem-solving, and fundamentals of computing.',
    highlights: [
      'Distinction in Mathematics and Computer Science',
      'Participated in Regional Science & Technology Exhibitions'
    ]
  }
];

export const certificates = [
  {
    id: 'cert-fs',
    title: 'Full Stack Web Development (MERN)',
    issuer: 'Professional Tech Academy',
    issueDate: 'October 2024',
    credentialId: 'GSR-8942-FS',
    image: certFullstack,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    description:
      'Comprehensive specialization covering end-to-end full stack development, authentication mechanisms, database modeling, and cloud deployments.'
  },
  {
    id: 'cert-react',
    title: 'Advanced React & Architecture',
    issuer: 'Frontend Mastery Program',
    issueDate: 'December 2024',
    credentialId: 'GSR-3419-RC',
    image: certReact,
    skills: ['Hooks', 'Context API', 'State Management', 'Sass', 'Performance'],
    description:
      'In-depth study of React component lifecycles, performance profiling, responsive CSS/Sass architectures, and modern client-side routing.'
  },
  {
    id: 'cert-js',
    title: 'Modern JavaScript (ES6+ & Beyond)',
    issuer: 'Web Engineering Institute',
    issueDate: 'August 2024',
    credentialId: 'GSR-1102-JS',
    image: certJavascript,
    skills: ['ES6+', 'Async / Await', 'DOM Manipulation', 'Event Loop', 'OOP'],
    description:
      'Rigorous mastery of JavaScript core internals: event loop, prototypes, closures, asynchronous execution models, and data structure algorithms.'
  },
];

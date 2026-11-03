import htmlIcon from '../assets/icons/html.svg';
import cssIcon from '../assets/icons/css.svg';
import jsIcon from '../assets/icons/javaS.svg';
import reactIcon from '../assets/icons/react.svg';
import nodeIcon from '../assets/icons/js.svg';
import expressIcon from '../assets/icons/ex.svg';
import gitIcon from '../assets/icons/git hub.svg';
import mongoIcon from '../assets/icons/mogo.svg';
import postmanIcon from '../assets/icons/postman.svg';

export const skillCategories = [
  { id: 'all', label: 'All Technologies' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend & Database' },
  { id: 'tools', label: 'Tools & DevOps' },
];

export const skillsData = [
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    icon: reactIcon,
    level: 'Core Focus',
    description: 'Component architecture, Hooks, Context API, state management, and SPA development.',
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    icon: jsIcon,
    level: 'Advanced',
    description: 'Modern ES6+ syntax, asynchronous programming, DOM manipulation, and functional patterns.',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'frontend',
    icon: htmlIcon,
    level: 'Foundational',
    description: 'Semantic markup, accessibility standards (a11y), responsive layouts, and SEO best practices.',
  },
  {
    id: 'css3-sass',
    name: 'CSS3 & Sass/SCSS',
    category: 'frontend',
    icon: cssIcon,
    level: 'Core Focus',
    description: 'Modular Sass/SCSS, mixins, variables, Flexbox, CSS Grid, and custom animations.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: nodeIcon,
    level: 'Intermediate',
    description: 'Server-side runtime, RESTful API architecture, package management, and file systems.',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    icon: expressIcon,
    level: 'Intermediate',
    description: 'Routing, middleware pipelines, error handling, and API integration.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    icon: mongoIcon,
    level: 'Intermediate',
    description: 'Document-oriented database, schema modeling with Mongoose, and CRUD operations.',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    icon: gitIcon,
    level: 'Proficient',
    description: 'Version control, branch management, collaborative workflows, and repository management.',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    icon: postmanIcon,
    level: 'Proficient',
    description: 'API testing, request collection structuring, mock endpoints, and environment variables.',
  },
];

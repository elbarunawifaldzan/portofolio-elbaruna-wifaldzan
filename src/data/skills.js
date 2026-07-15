import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiLaravel, SiNodedotjs, SiExpress,
  SiMysql, SiMongodb,
  SiGit, SiGithub, SiPostman, SiVscodium, SiFigma,
} from 'react-icons/si'

export const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML',        icon: SiHtml5,       color: '#E34F26' },
      { name: 'CSS',         icon: SiCss,         color: '#1572B6' },
      { name: 'JavaScript',  icon: SiJavascript,  color: '#F7DF1E' },
      { name: 'TypeScript',  icon: SiTypescript,  color: '#3178C6' },
      { name: 'React',       icon: SiReact,       color: '#61DAFB' },
      { name: 'Tailwind',    icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Laravel',     icon: SiLaravel,     color: '#FF2D20' },
      { name: 'Node.js',     icon: SiNodedotjs,   color: '#5FA04E' },
      { name: 'Express',     icon: SiExpress,     color: '#FFFFFF' },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL',       icon: SiMysql,       color: '#4479A1' },
      { name: 'MongoDB',     icon: SiMongodb,     color: '#47A248' },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git',         icon: SiGit,         color: '#F05032' },
      { name: 'GitHub',      icon: SiGithub,      color: '#FFFFFF' },
      { name: 'Postman',     icon: SiPostman,     color: '#FF6C37' },
      { name: 'VS Code',     icon: SiVscodium,    color: '#007ACC' },
      { name: 'Figma',       icon: SiFigma,       color: '#F24E1E' },
    ],
  },
]

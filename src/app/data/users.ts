
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'member' | 'guest';
  status: 'online' | 'away' | 'offline';
  avatar: string;
  email: string;
  department: string;
  projects: number;
  lastActive: string;
  location?: string;
  joinDate?: string;
  bio?: string;
  skills?: string[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const users: User[] = [
  { 
    id: '1', 
    name: 'Sarah Chen', 
    role: 'admin', 
    status: 'online', 
    avatar: '👩‍💼', 
    email: 'sarah@poziverse.io', 
    department: 'Engineering', 
    projects: 12, 
    lastActive: 'Now',
    location: 'San Francisco, CA',
    joinDate: 'Jan 2024',
    bio: 'Senior Engineering Manager leading the core infrastructure team.',
    skills: ['React', 'Node.js', 'System Design', 'Team Leadership'],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  { 
    id: '2', 
    name: 'Marcus Rodriguez', 
    role: 'member', 
    status: 'online', 
    avatar: '👨‍💻', 
    email: 'marcus@poziverse.io', 
    department: 'Design', 
    projects: 8, 
    lastActive: '5m ago',
    location: 'New York, NY',
    joinDate: 'Mar 2024',
    bio: 'Product Designer focused on user experience and accessibility.',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems']
  },
  { 
    id: '3', 
    name: 'Emily Watson', 
    role: 'member', 
    status: 'away', 
    avatar: '👩‍🎨', 
    email: 'emily@poziverse.io', 
    department: 'Marketing', 
    projects: 15, 
    lastActive: '1h ago',
    location: 'London, UK',
    joinDate: 'Feb 2024',
    bio: 'Marketing Specialist driving brand awareness and community engagement.',
    skills: ['Content Strategy', 'Social Media', 'Analytics', 'Copywriting']
  },
  { 
    id: '4', 
    name: 'David Kim', 
    role: 'admin', 
    status: 'online', 
    avatar: '👨‍🔬', 
    email: 'david@poziverse.io', 
    department: 'Engineering', 
    projects: 20, 
    lastActive: 'Now',
    location: 'Seoul, KR',
    joinDate: 'Dec 2023',
    bio: 'Principal Engineer architecting scalable backend solutions.',
    skills: ['Go', 'Kubernetes', 'Cloud Architecture', 'Microservices']
  },
  { 
    id: '5', 
    name: 'Lisa Anderson', 
    role: 'member', 
    status: 'offline', 
    avatar: '👩‍🚀', 
    email: 'lisa@poziverse.io', 
    department: 'Product', 
    projects: 6, 
    lastActive: '2d ago',
    location: 'Austin, TX',
    joinDate: 'Apr 2024',
    bio: 'Product Manager bridging the gap between engineering and business.',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping']
  },
  { 
    id: '6', 
    name: 'James Turner', 
    role: 'guest', 
    status: 'online', 
    avatar: '👨‍🎓', 
    email: 'james@external.com', 
    department: 'External', 
    projects: 2, 
    lastActive: '10m ago',
    location: 'Remote',
    joinDate: 'May 2024',
    bio: 'External consultant assisting with security audits.',
    skills: ['Cybersecurity', 'Penetration Testing', 'Compliance']
  },
  { 
    id: '7', 
    name: 'Nina Patel', 
    role: 'member', 
    status: 'online', 
    avatar: '👩‍⚕️', 
    email: 'nina@poziverse.io', 
    department: 'Operations', 
    projects: 9, 
    lastActive: 'Now',
    location: 'Toronto, CA',
    joinDate: 'Jan 2024',
    bio: 'Operations Manager ensuring smooth day-to-day workflows.',
    skills: ['Process Optimization', 'Project Management', 'Logistics']
  },
  { 
    id: '8', 
    name: 'Alex Foster', 
    role: 'member', 
    status: 'away', 
    avatar: '👨‍🏫', 
    email: 'alex@poziverse.io', 
    department: 'Engineering', 
    projects: 14, 
    lastActive: '30m ago',
    location: 'Berlin, DE',
    joinDate: 'Feb 2024',
    bio: 'Frontend Developer passionate about building performant web apps.',
    skills: ['Vue.js', 'TypeScript', 'Web Performance', 'Accessibility']
  },
];

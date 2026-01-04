import { Layers, Globe, Server, Database, Layout, Box, Cpu } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'completed' | 'archived' | 'in-progress';
  liveUrl: string;
  repoUrl: string;
  techStack: string[];
  lastUpdated: string;
  icon: any;
  color: 'cyan' | 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange';
  progress: number;
  collaborators: { initials: string; name: string; status: 'online' | 'offline' | 'away' }[];
  activity: { action: string; time: string; user: string; icon: any }[];
  stats: {
    views: number;
    stars: number;
    forks: number;
  };
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Poziverse Dashboard',
    subtitle: 'Workspace Orchestrator',
    description: 'A comprehensive workspace management interface with glassmorphism design. Centralizes project management, resource access, and deployment monitoring.',
    status: 'active',
    liveUrl: 'https://poziverse.com',
    repoUrl: 'https://github.com/genpozi/poziverse',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    lastUpdated: 'Just now',
    icon: Layout,
    color: 'cyan',
    progress: 85,
    collaborators: [
      { initials: 'JD', name: 'John Doe', status: 'online' },
      { initials: 'SA', name: 'Sarah Anderson', status: 'online' }
    ],
    activity: [
      { action: 'Deployed to production', time: '10m ago', user: 'You', icon: Server },
      { action: 'Updated documentation', time: '2h ago', user: 'Sarah', icon: Box }
    ],
    stats: { views: 1240, stars: 45, forks: 12 }
  },
  {
    id: 'p2',
    title: 'E-Commerce Platform',
    subtitle: 'Next.js Storefront',
    description: 'Modern e-commerce solution with headless CMS integration, Stripe payments, and real-time inventory management.',
    status: 'in-progress',
    liveUrl: 'https://store.example.com',
    repoUrl: 'https://github.com/genpozi/ecommerce',
    techStack: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    lastUpdated: '4 hours ago',
    icon: Globe,
    color: 'purple',
    progress: 60,
    collaborators: [
      { initials: 'MK', name: 'Mike Kumar', status: 'away' },
      { initials: 'JD', name: 'John Doe', status: 'online' }
    ],
    activity: [
      { action: 'Fixed payment bug', time: '1h ago', user: 'Mike', icon: Cpu },
      { action: 'Added new products', time: '5h ago', user: 'John', icon: Database }
    ],
    stats: { views: 850, stars: 23, forks: 5 }
  },
  {
    id: 'p3',
    title: 'Design System',
    subtitle: 'Component Library',
    description: 'Unified design language and component library for all internal tools. Includes documentation and Storybook integration.',
    status: 'active',
    liveUrl: 'https://design.example.com',
    repoUrl: 'https://github.com/genpozi/design-system',
    techStack: ['React', 'Storybook', 'Tailwind', 'Radix UI'],
    lastUpdated: '1 day ago',
    icon: Layers,
    color: 'pink',
    progress: 95,
    collaborators: [
      { initials: 'SA', name: 'Sarah Anderson', status: 'online' }
    ],
    activity: [
      { action: 'Published v2.0', time: '1d ago', user: 'Sarah', icon: Layers }
    ],
    stats: { views: 2100, stars: 89, forks: 34 }
  },
  {
    id: 'p4',
    title: 'API Gateway',
    subtitle: 'Microservices Entry',
    description: 'Centralized API gateway handling authentication, rate limiting, and request routing for backend services.',
    status: 'completed',
    liveUrl: 'https://api.example.com',
    repoUrl: 'https://github.com/genpozi/api-gateway',
    techStack: ['Node.js', 'Express', 'Redis', 'Docker'],
    lastUpdated: '1 week ago',
    icon: Server,
    color: 'blue',
    progress: 100,
    collaborators: [
      { initials: 'MK', name: 'Mike Kumar', status: 'away' }
    ],
    activity: [
      { action: 'Security patch', time: '1w ago', user: 'Mike', icon: Server }
    ],
    stats: { views: 560, stars: 12, forks: 2 }
  }
];

import { Github, Code, Layout, Box, Terminal, Cloud, Search, MessageSquare, Video, Settings } from 'lucide-react';

export interface LaunchpadItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any; // Lucide icon or string emoji
  color: string;
  url: string;
  repoUrl?: string;
  tags: string[];
  status: 'online' | 'offline' | 'maintenance';
  stats?: {
    uptime?: string;
    users?: number;
    version?: string;
  };
}

export const launchpadItems: LaunchpadItem[] = [
  // Development
  {
    id: 'dev-github',
    name: 'GitHub',
    description: 'Code repository & collaboration platform',
    category: 'Development',
    icon: Github,
    color: 'from-gray-400 to-gray-600',
    url: 'https://github.com',
    tags: ['Git', 'Version Control', 'CI/CD'],
    status: 'online',
    stats: { uptime: '99.9%', users: 1000000 }
  },
  {
    id: 'dev-vscode',
    name: 'VS Code',
    description: 'Code editor for the web',
    category: 'Development',
    icon: Code,
    color: 'from-blue-400 to-blue-600',
    url: 'https://vscode.dev',
    tags: ['Editor', 'IDE', 'Web'],
    status: 'online',
    stats: { version: '1.85.0' }
  },
  {
    id: 'dev-docker',
    name: 'Docker',
    description: 'Container platform',
    category: 'Development',
    icon: Box,
    color: 'from-blue-400 to-cyan-500',
    url: 'https://docker.com',
    tags: ['Containers', 'DevOps'],
    status: 'online'
  },
  
  // AI & Productivity
  {
    id: 'ai-gemini',
    name: 'Gemini',
    description: 'Google AI assistant',
    category: 'AI & Productivity',
    icon: Sparkles, // Using Sparkles as a proxy for AI
    color: 'from-purple-400 to-pink-500',
    url: 'https://gemini.google.com',
    tags: ['AI', 'LLM', 'Chat'],
    status: 'online'
  },
  {
    id: 'ai-ollama',
    name: 'Ollama',
    description: 'Local AI models',
    category: 'AI & Productivity',
    icon: Terminal,
    color: 'from-blue-400 to-cyan-500',
    url: 'https://ollama.ai',
    repoUrl: 'https://github.com/ollama/ollama',
    tags: ['AI', 'Local', 'LLM'],
    status: 'online'
  },

  // Communication
  {
    id: 'comm-slack',
    name: 'Slack',
    description: 'Team messaging',
    category: 'Communication',
    icon: MessageSquare,
    color: 'from-purple-400 to-pink-500',
    url: 'https://slack.com',
    tags: ['Chat', 'Team', 'Collaboration'],
    status: 'online'
  },
  {
    id: 'comm-discord',
    name: 'Discord',
    description: 'Community chat',
    category: 'Communication',
    icon: MessageSquare,
    color: 'from-indigo-400 to-purple-500',
    url: 'https://discord.com',
    tags: ['Chat', 'Community', 'Voice'],
    status: 'online'
  },

  // Infrastructure
  {
    id: 'infra-nextcloud',
    name: 'Nextcloud',
    description: 'Cloud storage & apps',
    category: 'Infrastructure',
    icon: Cloud,
    color: 'from-blue-400 to-cyan-500',
    url: 'https://nextcloud.com',
    tags: ['Storage', 'Self-hosted'],
    status: 'online'
  },
  {
    id: 'infra-plex',
    name: 'Plex',
    description: 'Media server',
    category: 'Infrastructure',
    icon: Video,
    color: 'from-yellow-400 to-orange-500',
    url: 'https://plex.tv',
    tags: ['Media', 'Streaming'],
    status: 'online'
  },
  {
    id: 'infra-homeassistant',
    name: 'Home Assistant',
    description: 'Home automation',
    category: 'Infrastructure',
    icon: Settings,
    color: 'from-cyan-400 to-blue-500',
    url: 'https://home-assistant.io',
    tags: ['IoT', 'Automation'],
    status: 'online'
  },

  // Design
  {
    id: 'design-figma',
    name: 'Figma',
    description: 'Design & prototyping',
    category: 'Design & Creative',
    icon: Layout,
    color: 'from-purple-400 to-pink-500',
    url: 'https://figma.com',
    tags: ['Design', 'UI/UX'],
    status: 'online'
  },

  // Data
  {
    id: 'data-google',
    name: 'Google',
    description: 'Search & workspace',
    category: 'Data & Analytics',
    icon: Search,
    color: 'from-blue-400 to-red-500',
    url: 'https://google.com',
    tags: ['Search', 'Web'],
    status: 'online'
  }
];

import { Sparkles } from 'lucide-react';

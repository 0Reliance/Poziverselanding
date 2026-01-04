import { Code, Key, Lock, Bookmark, Server, MoreHorizontal, Database } from 'lucide-react';
import { ResourceItem, Category } from './types';

export const categories: Category[] = [
  { id: 'all', label: 'All Items', icon: Database, count: 47 },
  { id: 'snippet', label: 'Code Snippets', icon: Code, count: 12 },
  { id: 'key', label: 'API Keys', icon: Key, count: 8 },
  { id: 'secret', label: 'Secrets', icon: Lock, count: 5 },
  { id: 'bookmark', label: 'Bookmarks', icon: Bookmark, count: 15 },
  { id: 'server', label: 'Servers', icon: Server, count: 4 },
  { id: 'other', label: 'Other', icon: MoreHorizontal, count: 3 },
];

export const resources: ResourceItem[] = [
  // Bookmarks
  {
    id: 'b1',
    type: 'bookmark',
    title: 'React Design Patterns',
    subtitle: 'patterns.dev/react',
    tags: ['React', 'Design Patterns', 'Best Practices', 'Frontend'],
    isFavorite: true,
    createdAt: 'Dec 10, 2025',
    metadata: {
      url: 'https://patterns.dev/react',
      description: 'Comprehensive guide to modern React patterns and best practices. Essential reading for all React developers. Covers hooks, context, composition patterns, and performance optimization strategies.',
      lastVisited: '1 day ago',
      category: 'Documentation'
    }
  },
  {
    id: 'b2',
    type: 'bookmark',
    title: 'TypeScript Handbook',
    subtitle: 'typescriptlang.org/docs',
    tags: ['TypeScript', 'Documentation'],
    isFavorite: false,
    createdAt: 'Jan 2, 2026',
    metadata: {
      url: 'https://www.typescriptlang.org/docs/',
      description: 'The official TypeScript documentation.',
      lastVisited: '2 days ago',
      category: 'Documentation'
    }
  },

  // Secrets
  {
    id: 's1',
    type: 'secret',
    title: 'JWT Secret',
    subtitle: 'Auth',
    tags: ['React', 'AWS', 'PostgreSQL', 'OpenAI', 'Stripe', 'Auth'],
    isFavorite: false,
    createdAt: 'Nov 1, 2025',
    metadata: {
      description: 'Authentication token signing key',
      value: 'sk_live_51Mz...', // This would be hidden in UI
      lastRotated: 'Nov 1, 2025',
      nextRotation: 'Feb 1, 2026',
      associatedServices: ['API Gateway', 'Auth Service', 'User Service'],
      recentAccess: [
        { service: 'API Gateway', time: '3 hours ago' },
        { service: 'Auth Service', time: '5 hours ago' },
        { service: 'User Service', time: '1 day ago' }
      ]
    }
  },

  // API Keys
  {
    id: 'k1',
    type: 'key',
    title: 'OpenAI API Key',
    subtitle: 'OpenAI',
    tags: ['React', 'AWS', 'PostgreSQL', 'OpenAI', 'Stripe', 'Auth'],
    isFavorite: false,
    createdAt: 'Jan 8, 2025',
    metadata: {
      description: 'Production API key for GPT-4 with enhanced capabilities',
      value: 'sk-proj-1234...',
      environment: 'Production',
      service: 'OpenAI GPT-4',
      rateLimit: '10,000 requests/day',
      expires: 'Jan 8, 2026',
      usage: {
        today: '3,420',
        thisWeek: '18,650',
        thisMonth: '72,340'
      },
      permissions: ['gpt-4', 'embeddings', 'moderation']
    }
  },
  {
    id: 'k2',
    type: 'key',
    title: 'Stripe API Key',
    subtitle: 'Stripe',
    tags: ['Stripe', 'Payments'],
    isFavorite: false,
    createdAt: 'Dec 15, 2025',
    metadata: {
      description: 'Payment processing credentials',
      value: 'pk_live_...',
      environment: 'Production',
      service: 'Stripe Payments'
    }
  },

  // Code Snippets
  {
    id: 'c1',
    type: 'snippet',
    title: 'React useAuth Hook',
    subtitle: 'React',
    tags: ['React', 'AWS', 'PostgreSQL', 'OpenAI', 'Stripe', 'Auth', 'Typescript'],
    isFavorite: true,
    createdAt: 'Jan 3, 2026',
    content: `import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('authToken')
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    }
  }, [token]);

  const login = async (credentials) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const { token } = await res.json();
    localStorage.setItem('authToken', token);
    setToken(token);
  };

  return { user, token, login };
}`,
    metadata: {
      description: 'Custom authentication hook with token refresh',
      language: 'Typescript',
      usageCount: 'Used 47 times'
    }
  },
  {
    id: 'c2',
    type: 'snippet',
    title: 'Tailwind Config',
    subtitle: 'Tailwind',
    tags: ['Tailwind', 'Config'],
    isFavorite: false,
    createdAt: 'Dec 20, 2025',
    content: `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',
      }
    }
  }
}`,
    metadata: {
      description: 'Custom theme configuration',
      language: 'JavaScript'
    }
  },
  {
    id: 'c3',
    type: 'snippet',
    title: 'API Error Handler',
    subtitle: 'Express',
    tags: ['Express', 'Node.js'],
    isFavorite: false,
    createdAt: 'Dec 22, 2025',
    content: `app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});`,
    metadata: {
      description: 'Global error handling middleware',
      language: 'JavaScript'
    }
  }
];

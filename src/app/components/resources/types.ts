import { LucideIcon } from 'lucide-react';

export type ResourceType = 'snippet' | 'secret' | 'key' | 'bookmark';

export interface ResourceItem {
  id: string;
  type: ResourceType;
  title: string;
  subtitle?: string; // e.g., "React", "Auth"
  tags: string[];
  icon?: LucideIcon;
  metadata: Record<string, any>;
  content?: string; // For code snippets
  isFavorite?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

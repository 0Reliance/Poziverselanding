import { HardDrive, Cloud, Server, Database, FolderGit2, Laptop, Network } from 'lucide-react';

export interface FileSource {
  id: string;
  name: string;
  type: 'cloud' | 'server' | 'local' | 'network' | 'container';
  provider: 'gdrive' | 'dropbox' | 's3' | 'smb' | 'ssh' | 'local' | 'docker';
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  path: string;
  capacity: {
    used: number; // GB
    total: number; // GB
  };
  lastSync: string;
  icon: any;
  color: 'cyan' | 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange';
  notes?: string;
  credentialsId?: string;
}

export const fileSources: FileSource[] = [
  {
    id: 'fs1',
    name: 'Google Drive',
    type: 'cloud',
    provider: 'gdrive',
    status: 'connected',
    path: '/mnt/gdrive/personal',
    capacity: { used: 45.5, total: 100 },
    lastSync: '2 mins ago',
    icon: Cloud,
    color: 'blue',
    notes: 'Personal Google Drive account. Contains design assets and project documentation.',
    credentialsId: 'cred_gdrive_01'
  },
  {
    id: 'fs2',
    name: 'Production Assets',
    type: 'server',
    provider: 's3',
    status: 'syncing',
    path: 's3://pozi-assets-prod',
    capacity: { used: 1240, total: 5000 },
    lastSync: 'Syncing...',
    icon: Database,
    color: 'orange',
    notes: 'Main S3 bucket for production media assets. Read-only access for most users.',
    credentialsId: 'cred_aws_prod'
  },
  {
    id: 'fs3',
    name: 'Dev Server',
    type: 'server',
    provider: 'ssh',
    status: 'connected',
    path: 'ssh://dev-01:/var/www/html',
    capacity: { used: 82, total: 250 },
    lastSync: '1 hour ago',
    icon: Server,
    color: 'purple',
    notes: 'Development server for testing deployments. SSH key access required.',
    credentialsId: 'cred_ssh_dev01'
  },
  {
    id: 'fs4',
    name: 'Local Projects',
    type: 'local',
    provider: 'local',
    status: 'connected',
    path: '~/Projects',
    capacity: { used: 240, total: 1000 },
    lastSync: 'Real-time',
    icon: Laptop,
    color: 'green'
  },
  {
    id: 'fs5',
    name: 'Legacy NAS',
    type: 'network',
    provider: 'smb',
    status: 'disconnected',
    path: 'smb://192.168.1.100/public',
    capacity: { used: 3500, total: 4000 },
    lastSync: '2 days ago',
    icon: Network,
    color: 'yellow'
  }
];

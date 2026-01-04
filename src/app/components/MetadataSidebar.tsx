import { Calendar, User as UserIcon, Tag, Clock, FileText, Eye, Users, TrendingUp, Share, Edit3, MessageSquare, Sparkles, Github, ExternalLink, Layers, Code2, Mail, MapPin, Briefcase, Shield, Copy, Globe, Key, Lock, Server, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../data/projects';
import { LaunchpadItem } from '../data/launchpad';
import { ResourceItem } from './resources/types';
import type { User } from '../data/users';

interface MetadataSidebarProps {
  selectedProject: Project | null;
  selectedLaunchpadItem?: LaunchpadItem | null;
  selectedUser?: User | null;
  selectedResource?: ResourceItem | null;
}

export function MetadataSidebar({ selectedProject, selectedLaunchpadItem, selectedUser, selectedResource }: MetadataSidebarProps) {
  // Handle Resource View
  if (selectedResource) {
    const getIcon = () => {
      switch (selectedResource.type) {
        case 'snippet': return Code2;
        case 'key': return Key;
        case 'secret': return Lock;
        case 'bookmark': return Globe;
        case 'server': return Server;
        default: return MoreHorizontal;
      }
    };
    const Icon = getIcon();

    return (
      <div className="relative w-80 flex-shrink-0 z-20 h-full overflow-hidden flex flex-col">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-l border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Icon className="w-4 h-4 text-cyan-400" />
                Resource Details
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Share className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 capitalize">{selectedResource.type}</p>
          </div>
          
          {/* Resource Header */}
          <div className="p-6 border-b border-white/10 flex-shrink-0 text-center">
            <motion.div 
              className="relative w-20 h-20 mx-auto mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl opacity-20 blur-xl" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center shadow-2xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <h3 className="text-xl text-white font-semibold mb-1">{selectedResource.title}</h3>
            <p className="text-cyan-400 text-sm font-medium mb-4">{selectedResource.subtitle}</p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedResource.tags.map(tag => (
                <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6 space-y-6">
            {/* Description */}
            {selectedResource.metadata.description && (
              <div className="space-y-2">
                <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Description</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedResource.metadata.description}
                </p>
              </div>
            )}

            {/* Snippet Specific */}
            {selectedResource.type === 'snippet' && selectedResource.content && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Code Snippet</h4>
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="bg-[#0d1117] rounded-xl border border-white/20 overflow-hidden shadow-lg">
                  <div className="p-3 overflow-x-auto">
                    <pre className="font-mono text-xs text-gray-200 leading-relaxed">
                      <code>{selectedResource.content}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Key/Secret Specific */}
            {(selectedResource.type === 'key' || selectedResource.type === 'secret') && selectedResource.metadata.value && (
              <div className="space-y-3">
                <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {selectedResource.type === 'key' ? 'API Key' : 'Secret Value'}
                </h4>
                <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex items-center gap-2">
                  <code className="font-mono text-xs text-gray-300 break-all flex-1">
                    {selectedResource.metadata.value}
                  </code>
                  <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Bookmark Specific */}
            {selectedResource.type === 'bookmark' && selectedResource.metadata.url && (
              <div className="space-y-3">
                <a 
                  href={selectedResource.metadata.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Link
                </a>
              </div>
            )}

            {/* Server Specific */}
            {selectedResource.type === 'server' && (
              <div className="space-y-3">
                <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Server Details</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-500 block mb-1">IP Address</span>
                    <span className="text-sm text-gray-300 font-mono">{selectedResource.metadata.ip || 'N/A'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-500 block mb-1">Status</span>
                    <span className="text-sm text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {selectedResource.metadata.status || 'Unknown'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Common Metadata Fields */}
            <div className="space-y-3">
              <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Details</h4>
              <div className="space-y-2">
                {selectedResource.metadata.environment && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-500">Environment</span>
                    <span className="text-xs text-gray-300">{selectedResource.metadata.environment}</span>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-500">Created</span>
                  <span className="text-xs text-gray-300">{selectedResource.createdAt}</span>
                </div>
                {selectedResource.updatedAt && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-500">Updated</span>
                    <span className="text-xs text-gray-300">{selectedResource.updatedAt}</span>
                  </div>
                )}
                {selectedResource.metadata.lastRotated && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xs text-gray-500">Last Rotated</span>
                    <span className="text-xs text-gray-300">{selectedResource.metadata.lastRotated}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Stats (if available) */}
            {selectedResource.metadata.usage && (
              <div className="space-y-3">
                <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Usage Statistics</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-500 block">Today</span>
                    <span className="text-sm font-medium text-white">{selectedResource.metadata.usage.today || 0}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-500 block">Week</span>
                    <span className="text-sm font-medium text-white">{selectedResource.metadata.usage.thisWeek || 0}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-500 block">Month</span>
                    <span className="text-sm font-medium text-white">{selectedResource.metadata.usage.thisMonth || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle User View
  if (selectedUser) {
    return (
      <div className="relative w-80 flex-shrink-0 z-20 h-full overflow-hidden flex flex-col">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-l border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-cyan-400" />
                User Profile
              </h2>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  selectedUser.status === 'online' ? 'bg-green-400' : 
                  selectedUser.status === 'away' ? 'bg-yellow-400' : 'bg-gray-500'
                }`} />
                <span className={`text-xs ${
                  selectedUser.status === 'online' ? 'text-green-400' : 
                  selectedUser.status === 'away' ? 'text-yellow-400' : 'text-gray-500'
                } capitalize`}>{selectedUser.status}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">Employee details</p>
          </div>
          
          {/* Profile Header */}
          <div className="p-6 border-b border-white/10 flex-shrink-0 text-center">
            <motion.div 
              className="relative w-24 h-24 mx-auto mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl opacity-20 blur-xl" />
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-5xl shadow-2xl">
                {selectedUser.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center gap-1">
                <Shield className="w-3 h-3 text-cyan-400" />
                <span className="text-[10px] text-white uppercase font-bold tracking-wider">{selectedUser.role}</span>
              </div>
            </motion.div>
            
            <h3 className="text-xl text-white font-semibold mb-1">{selectedUser.name}</h3>
            <p className="text-cyan-400 text-sm font-medium mb-4">{selectedUser.department}</p>
            
            <div className="flex gap-2 justify-center">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 text-xs font-medium hover:bg-cyan-400/30 transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                Message
              </button>
              <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="p-6 space-y-6">
            {/* Contact */}
            <div className="space-y-3">
              <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-300 truncate">{selectedUser.email}</p>
                  </div>
                </div>
                {selectedUser.location && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm text-gray-300 truncate">{selectedUser.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {selectedUser.bio && (
              <div className="space-y-2">
                <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">About</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedUser.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {selectedUser.skills && (
              <div className="space-y-3">
                <h4 className="text-xs text-gray-500 font-medium uppercase tracking-wider">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-gray-500">Projects</span>
                </div>
                <p className="text-lg font-semibold text-white">{selectedUser.projects}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-gray-500">Joined</span>
                </div>
                <p className="text-lg font-semibold text-white">{selectedUser.joinDate || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle Launchpad Item View
  if (selectedLaunchpadItem) {
    const Icon = selectedLaunchpadItem.icon;
    
    return (
      <div className="relative w-80 flex-shrink-0 z-20 h-full overflow-hidden flex flex-col">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-l border-white/10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5" />
        </div>
        
        {/* Content */}
        <div className="relative h-full flex flex-col overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                App Info
              </h2>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${selectedLaunchpadItem.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-xs ${selectedLaunchpadItem.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>{selectedLaunchpadItem.status}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">Service details</p>
          </div>
          
          {/* Preview section */}
          <div className="p-6 border-b border-white/10 flex-shrink-0">
            <motion.div 
              className="relative h-40 rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedLaunchpadItem.id}
            >
              {/* Image/Preview */}
              <div className={`absolute inset-0 bg-gradient-to-br ${selectedLaunchpadItem.color} opacity-20 backdrop-blur-sm border border-white/20`} />
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center p-4">
                <div className="text-center">
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <p className="text-sm text-white font-medium truncate max-w-[200px]">{selectedLaunchpadItem.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{selectedLaunchpadItem.category}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3 mt-4">
              <a 
                href={selectedLaunchpadItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium hover:bg-purple-500/20 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Launch Application
              </a>
              {selectedLaunchpadItem.repoUrl && (
                <a 
                  href={selectedLaunchpadItem.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium hover:bg-white/10 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  View Source
                </a>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="px-6 py-4 border-b border-white/10 flex-shrink-0">
            <h3 className="text-sm text-gray-400 font-medium mb-3 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedLaunchpadItem.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats if available */}
          {selectedLaunchpadItem.stats && (
            <div className="p-6 space-y-3 flex-shrink-0">
              {Object.entries(selectedLaunchpadItem.stats).map(([key, value], index) => (
                <motion.div 
                  key={key} 
                  className="group relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-purple-400/30 transition-all duration-200" />
                  <div className="relative p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium capitalize">{key}</p>
                      <p className="text-sm text-gray-300 truncate">{value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Description */}
          <div className="p-6 border-t border-white/10 flex-shrink-0">
            <h3 className="text-sm text-gray-400 mb-2 font-medium">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {selectedLaunchpadItem.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle Project View (Existing Code)
  if (!selectedProject) {
    return (
      <div className="relative w-80 flex-shrink-0 z-20 border-l border-white/10 bg-black/20 backdrop-blur-xl flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-gray-400 font-medium">No Project Selected</h3>
          <p className="text-sm text-gray-600 mt-2">Select a project to view details</p>
        </div>
      </div>
    );
  }

  const metadata = [
    { label: 'Modified', value: selectedProject.lastUpdated, icon: Clock },
    { label: 'Owner', value: selectedProject.collaborators[0]?.name || 'Unknown', icon: UserIcon },
    { label: 'Status', value: selectedProject.status, icon: FileText },
    { label: 'Views', value: selectedProject.stats.views.toString(), icon: Eye },
  ];

  return (
    <div className="relative w-80 flex-shrink-0 z-20 h-full overflow-hidden flex flex-col">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-l border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Project Info
            </h2>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${selectedProject.status === 'Live' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <span className={`text-xs ${selectedProject.status === 'Live' ? 'text-green-400' : 'text-yellow-400'}`}>{selectedProject.status}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Metadata and context</p>
        </div>
        
        {/* Preview section */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <motion.div 
            className="relative h-40 rounded-xl overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={selectedProject.id}
          >
            {/* Image/Preview */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20" />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center p-4">
              <div className="text-center">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="w-7 h-7 text-cyan-400" />
                </motion.div>
                <p className="text-sm text-white font-medium truncate max-w-[200px]">{selectedProject.title}</p>
                <p className="text-xs text-gray-400 mt-1">{selectedProject.subtitle}</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <a 
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Launch
            </a>
            <a 
              href={selectedProject.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium hover:bg-white/10 transition-colors"
            >
              <Github className="w-3 h-3" />
              Code
            </a>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="p-6 space-y-4">
          {metadata.map((item, index) => (
            <motion.div 
              key={item.label}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 text-gray-400">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-gray-400">{item.label}</span>
              </div>
              <span className="text-sm text-white font-medium">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-sm text-gray-400 mb-2 font-medium">Description</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            {selectedProject.description}
          </p>
        </div>
      </div>
    </div>
  );
}

import { Calendar, User as UserIcon, Tag, Clock, FileText, Eye, Users, TrendingUp, Share, Edit3, MessageSquare, Sparkles, Github, ExternalLink, Layers, Code2, Mail, MapPin, Briefcase, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../data/projects';
import { LaunchpadItem } from '../data/launchpad';
import { User } from '../data/users';

interface MetadataSidebarProps {
  selectedProject: Project | null;
  selectedLaunchpadItem?: LaunchpadItem | null;
  selectedUser?: User | null;
}

export function MetadataSidebar({ selectedProject, selectedLaunchpadItem, selectedUser }: MetadataSidebarProps) {
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
    { label: 'Owner', value: selectedProject.collaborators[0]?.name || 'Unknown', icon: User },
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

        {/* Tech Stack */}
        <div className="px-6 py-4 border-b border-white/10 flex-shrink-0">
          <h3 className="text-sm text-gray-400 font-medium mb-3 flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5" />
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Collaborators section */}
        <div className="px-6 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-400 font-medium flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              Team
            </h3>
            <span className="text-xs text-cyan-400">{selectedProject.collaborators.length} active</span>
          </div>
          <div className="flex items-center gap-2">
            {selectedProject.collaborators.map((collaborator, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <span className="text-xs text-cyan-400 font-semibold">{collaborator.initials}</span>
                </div>
                <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-black ${
                  collaborator.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                }`} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 backdrop-blur-xl border border-white/20 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {collaborator.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Metadata list */}
        <div className="p-6 space-y-3 flex-shrink-0">
          {metadata.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.label} 
                className="group relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-cyan-400/30 transition-all duration-200" />
                <div className="relative p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">{item.label}</p>
                    <p className="text-sm text-gray-300 truncate">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Activity section */}
        <div className="p-6 border-t border-white/10 flex-shrink-0 pb-20">
          <h3 className="text-sm text-gray-400 mb-4 font-medium flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {selectedProject.activity.map((activity, index) => (
              <div key={index} className="relative pl-4 border-l border-white/10">
                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500/20 border border-cyan-500/50" />
                <p className="text-sm text-gray-300">{activity.action}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-cyan-400">{activity.user}</span>
                  <span className="text-[10px] text-gray-600">•</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

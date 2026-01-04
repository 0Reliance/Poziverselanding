import { Calendar, User, Tag, Clock, FileText, Eye, Users, TrendingUp, Share, Edit3, MessageSquare, Sparkles, Github, ExternalLink, Layers, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../data/projects';

interface MetadataSidebarProps {
  selectedProject: Project | null;
}

export function MetadataSidebar({ selectedProject }: MetadataSidebarProps) {
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
    { label: 'Created', value: selectedProject.createdAt, icon: Calendar },
    { label: 'Modified', value: selectedProject.lastModified, icon: Clock },
    { label: 'Owner', value: selectedProject.owner, icon: User },
    { label: 'Status', value: selectedProject.status, icon: FileText },
    { label: 'Views', value: selectedProject.views, icon: Eye },
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
                <p className="text-xs text-gray-400 mt-1">{selectedProject.category}</p>
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

import { Calendar, User, Tag, Clock, FileText, Eye, Users, TrendingUp, Share, Edit3, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function MetadataSidebar() {
  const metadata = [
    { label: 'Created', value: 'Dec 15, 2025', icon: Calendar, color: 'cyan' },
    { label: 'Modified', value: '2 hours ago', icon: Clock, color: 'blue' },
    { label: 'Owner', value: 'John Doe', icon: User, color: 'purple' },
    { label: 'Type', value: 'Document', icon: FileText, color: 'green' },
    { label: 'Tags', value: 'Design, Work', icon: Tag, color: 'yellow' },
    { label: 'Views', value: '142', icon: Eye, color: 'pink' },
  ];

  const collaborators = [
    { initials: 'JD', name: 'John Doe', status: 'online' },
    { initials: 'SA', name: 'Sarah Anderson', status: 'online' },
    { initials: 'MK', name: 'Mike Kumar', status: 'away' },
  ];

  const activities = [
    { action: 'Edited document', time: '2h ago', icon: Edit3, user: 'You' },
    { action: 'Added comment', time: '5h ago', icon: MessageSquare, user: 'Sarah' },
    { action: 'Shared with team', time: '1d ago', icon: Share, user: 'John' },
  ];
  
  return (
    <div className="relative w-80 flex-shrink-0 z-20">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-l border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Document Info
            </h2>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Live</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Metadata and context</p>
        </div>
        
        {/* Preview section with enhanced design */}
        <div className="p-6 border-b border-white/10">
          <motion.div 
            className="relative h-40 rounded-xl overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Glassmorphic preview card */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 group-hover:border-cyan-400/40 transition-colors" />
            
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Starfield effect with glow */}
            <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
            <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
            <div className="absolute bottom-6 left-10 w-1 h-1 bg-white/30 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
            <div className="absolute bottom-10 right-6 w-1.5 h-1.5 bg-white/50 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            <div className="absolute top-12 left-16 w-0.5 h-0.5 bg-white/35 rounded-full" />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                </motion.div>
                <p className="text-sm text-white font-medium">Project Alpha</p>
                <p className="text-xs text-gray-400 mt-1">Product Design System</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collaborators section */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm text-gray-400 font-medium">Collaborators</h3>
            <span className="text-xs text-cyan-400">{collaborators.length} active</span>
          </div>
          <div className="flex items-center gap-2">
            {collaborators.map((collaborator, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <span className="text-xs text-cyan-400 font-semibold">{collaborator.initials}</span>
                </div>
                {/* Status indicator */}
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black ${
                  collaborator.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 backdrop-blur-xl border border-white/20 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {collaborator.name}
                </div>
              </motion.div>
            ))}
            <motion.button
              className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        {/* Metadata list with enhanced styling */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
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
                {/* Background with hover effect */}
                <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 group-hover:border-cyan-400/30 transition-all duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                
                {/* Content */}
                <div className="relative p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-400/50 transition-colors">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1 font-medium">{item.label}</p>
                    <p className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Activity section with timeline */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-sm text-gray-400 mb-4 font-medium flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div 
                  key={index} 
                  className="relative group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all" />
                  <div className="relative p-3 flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{activity.user}</p>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="p-6">
          <motion.div 
            className="relative h-16 rounded-xl overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative h-full flex items-center justify-center">
              <button className="text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors font-medium">
                View Full History →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

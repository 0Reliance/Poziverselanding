import { motion } from 'motion/react';
import { FileText, Image, Video, Music } from 'lucide-react';

interface WorkspaceProps {
  selectedNavItem: string;
}

const workspaceContent = [
  { id: 1, title: 'Project Alpha', type: 'document', icon: FileText, color: 'cyan' },
  { id: 2, title: 'Design Assets', type: 'image', icon: Image, color: 'blue' },
  { id: 3, title: 'Video Presentation', type: 'video', icon: Video, color: 'purple' },
  { id: 4, title: 'Audio Notes', type: 'audio', icon: Music, color: 'pink' },
  { id: 5, title: 'Research Document', type: 'document', icon: FileText, color: 'green' },
  { id: 6, title: 'Brand Guidelines', type: 'document', icon: FileText, color: 'yellow' },
];

const colorGradients = {
  cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-400/30',
  blue: 'from-blue-500/20 to-blue-600/20 border-blue-400/30',
  purple: 'from-purple-500/20 to-purple-600/20 border-purple-400/30',
  pink: 'from-pink-500/20 to-pink-600/20 border-pink-400/30',
  green: 'from-green-500/20 to-green-600/20 border-green-400/30',
  yellow: 'from-yellow-500/20 to-yellow-600/20 border-yellow-400/30',
};

const iconColors = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
};

export function Workspace({ selectedNavItem }: WorkspaceProps) {
  return (
    <div className="relative flex-1 z-10">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <motion.div
            key={selectedNavItem}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl text-white mb-2">Workspace</h1>
            <p className="text-gray-400">Manage your content and collaborate</p>
          </motion.div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaceContent.map((item, index) => {
              const Icon = item.icon;
              const gradient = colorGradients[item.color as keyof typeof colorGradients];
              const iconColor = iconColors[item.color as keyof typeof iconColors];
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/10 to-blue-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  
                  {/* Card */}
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    {/* Top gradient section */}
                    <div className={`h-24 bg-gradient-to-br ${gradient} border-b border-white/10 relative overflow-hidden`}>
                      {/* Starfield dots */}
                      <div className="absolute top-3 left-4 w-1 h-1 bg-white/40 rounded-full" />
                      <div className="absolute top-6 right-6 w-0.5 h-0.5 bg-white/30 rounded-full" />
                      <div className="absolute bottom-4 left-8 w-0.5 h-0.5 bg-white/20 rounded-full" />
                      <div className="absolute bottom-6 right-10 w-1 h-1 bg-white/25 rounded-full" />
                      
                      {/* Icon */}
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                    </div>
                    
                    {/* Bottom info section */}
                    <div className="p-4">
                      <h3 className="text-white font-medium mb-2">{item.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10">
                          <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                        </div>
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Empty state decoration */}
          <div className="mt-12 relative h-32 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 border border-white/5" />
            <div className="relative h-full flex items-center justify-center">
              <p className="text-gray-500 text-sm">Drag and drop files here to add them to your workspace</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

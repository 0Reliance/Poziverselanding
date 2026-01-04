import { motion } from 'motion/react';
import { FileText, Image, Video, Music, Star, Users, Clock, TrendingUp, Share, Download, EllipsisVertical, Zap, Sparkles, Code2, Layers, Box, Layout } from 'lucide-react';
import { useState } from 'react';
import { projects, Project } from '../data/projects';

interface WorkspaceProps {
  selectedNavItem: string;
  isMobile?: boolean;
  onSelectProject: (project: Project) => void;
}

const iconMap: Record<string, any> = {
  FileText, Image, Video, Music, Code2, Layers, Box, Layout
};

const colorGradients = {
  cyan: 'from-cyan-500/20 to-cyan-600/30',
  blue: 'from-blue-500/20 to-blue-600/30',
  purple: 'from-purple-500/20 to-purple-600/30',
  pink: 'from-pink-500/20 to-pink-600/30',
  green: 'from-green-500/20 to-green-600/30',
  yellow: 'from-yellow-500/20 to-yellow-600/30',
};

const colorAccents = {
  cyan: 'border-cyan-400/40 shadow-cyan-500/20',
  blue: 'border-blue-400/40 shadow-blue-500/20',
  purple: 'border-purple-400/40 shadow-purple-500/20',
  pink: 'border-pink-400/40 shadow-pink-500/20',
  green: 'border-green-400/40 shadow-green-500/20',
  yellow: 'border-yellow-400/40 shadow-yellow-500/20',
};

const iconColors = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
};

const glowColors = {
  cyan: 'from-cyan-400/20 to-blue-400/20',
  blue: 'from-blue-400/20 to-indigo-400/20',
  purple: 'from-purple-400/20 to-pink-400/20',
  pink: 'from-pink-400/20 to-rose-400/20',
  green: 'from-green-400/20 to-emerald-400/20',
  yellow: 'from-yellow-400/20 to-amber-400/20',
};

export function Workspace({ selectedNavItem, isMobile = false, onSelectProject }: WorkspaceProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative flex-1 z-10">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className={`border-b border-white/10 ${isMobile ? 'p-4' : 'p-8'}`}>
          <motion.div
            key={selectedNavItem}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobile ? (
              // Mobile Header - Simplified
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-xl text-white">Workspace</h1>
                  <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                    <span className="text-xs text-cyan-400 font-medium">{projects.length}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Recent projects</p>
              </div>
            ) : (
              // Desktop Header - Full Featured
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl text-white">Workspace</h1>
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs text-cyan-400 font-medium">{projects.length} Active</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400">Manage your content and collaborate with your team</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-gray-300 text-sm transition-all duration-200">
                    Filter
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400 text-sm transition-all duration-200 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative">New Project</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Main content area */}
        <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-8'}`}>
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
            {projects.map((item, index) => {
              const Icon = item.icon;
              const gradient = colorGradients[item.color as keyof typeof colorGradients];
              const accent = colorAccents[item.color as keyof typeof colorAccents];
              const iconColor = iconColors[item.color as keyof typeof iconColors];
              const glow = glowColors[item.color as keyof typeof glowColors];
              const isHovered = hoveredCard === item.id;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => onSelectProject(item)}
                >
                  {/* Hover glow effect - Desktop only */}
                  {!isMobile && (
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${glow} rounded-2xl blur-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Card */}
                  <div className={`relative ${isMobile ? 'rounded-xl' : 'rounded-2xl'} overflow-hidden border bg-white/5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${accent} shadow-lg hover:shadow-2xl`}>
                    {/* Top gradient section with pattern */}
                    <div className={`${isMobile ? 'h-24' : 'h-32'} bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                      {/* Animated gradient overlay - Desktop only */}
                      {!isMobile && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                          animate={{ 
                            x: isHovered ? ['-100%', '100%'] : '-100%',
                          }}
                          transition={{ 
                            duration: 1.5,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      
                      {/* Starfield dots with glow - Simplified on mobile */}
                      <div className={`absolute top-3 left-4 ${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]`} />
                      <div className={`absolute top-5 right-6 ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'} bg-white/40 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.4)]`} />
                      {!isMobile && (
                        <>
                          <div className="absolute bottom-6 left-12 w-1 h-1 bg-white/30 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.3)]" />
                          <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-white/50 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                          <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-white/20 rounded-full" />
                        </>
                      )}
                      
                      {/* Icon container with better styling */}
                      <div className={`absolute ${isMobile ? 'bottom-3 left-3 w-10 h-10 rounded-lg' : 'bottom-4 left-4 w-14 h-14 rounded-xl'} bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl`}>
                        <Icon className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} ${iconColor} drop-shadow-[0_0_8px_currentColor]`} />
                      </div>
                      
                      {/* Star indicator */}
                      {item.isStarred && (
                        <motion.div 
                          className={`absolute ${isMobile ? 'top-3 right-3' : 'top-4 right-4'}`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                        >
                          <Star className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]`} />
                        </motion.div>
                      )}
                      
                      {/* Quick actions - visible on hover (Desktop only) */}
                      {!isMobile && (
                        <motion.div 
                          className="absolute top-4 right-4 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {!item.isStarred && (
                            <>
                              <button className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors">
                                <Share className="w-3.5 h-3.5 text-white/80" />
                              </button>
                              <button className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors">
                                <Download className="w-3.5 h-3.5 text-white/80" />
                              </button>
                              <button className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors">
                                <EllipsisVertical className="w-3.5 h-3.5 text-white/80" />
                              </button>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Bottom info section */}
                    <div className={isMobile ? 'p-3' : 'p-5'}>
                      {/* Title and subtitle */}
                      <div className={isMobile ? 'mb-2' : 'mb-3'}>
                        <h3 className={`text-white font-semibold leading-tight ${isMobile ? 'text-sm mb-0.5' : 'mb-1'}`}>{item.title}</h3>
                        <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>{item.subtitle}</p>
                      </div>
                      
                      {/* Progress bar */}
                      {!isMobile && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-gray-400">Progress</span>
                            <span className="text-xs text-gray-300 font-medium">{item.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${gradient} rounded-full relative`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                            </motion.div>
                          </div>
                        </div>
                      )}
                      
                      {/* Tags - Limit on mobile */}
                      <div className={`flex flex-wrap gap-1.5 ${isMobile ? 'mb-2' : 'mb-4'}`}>
                        {item.techStack.slice(0, isMobile ? 2 : item.techStack.length).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={`rounded-md bg-white/5 border border-white/10 text-gray-400 ${isMobile ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Meta info */}
                      <div className={`flex items-center justify-between ${isMobile ? 'pt-2' : 'pt-3'} border-t border-white/10`}>
                        <div className="flex items-center gap-3">
                          {/* Collaborators */}
                          <div className="flex items-center gap-1.5">
                            <Users className={`text-gray-500 ${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                            <span className={`text-gray-400 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{item.collaborators.length}</span>
                          </div>

                        </div>
                        
                        {/* Updated time */}
                        <div className="flex items-center gap-1.5">
                          <Clock className={`text-gray-500 ${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                          <span className={`text-gray-500 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>{item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Empty state decoration - Desktop only */}
          {!isMobile && (
            <motion.div 
              className="mt-12 relative h-40 rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 border border-white/10 group-hover:border-white/20 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/30 transition-colors">
                  <Zap className="w-8 h-8 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-gray-500 text-sm">Drag and drop files here or click to browse</p>
                <p className="text-gray-600 text-xs">Supports documents, images, videos, and audio files</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

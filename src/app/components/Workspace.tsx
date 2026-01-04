import { motion } from 'motion/react';
import { FileText, Image, Video, Music, Star, Users, Clock, TrendingUp, Share, Download, EllipsisVertical, Zap, Sparkles, Code2, Layers, Box, Layout, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { projects, Project } from '../data/projects';
import { CreateProjectDialog } from './CreateProjectDialog';

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
  orange: 'from-orange-500/20 to-orange-600/30',
};

const colorAccents = {
  cyan: 'border-cyan-400/40 shadow-cyan-500/20',
  blue: 'border-blue-400/40 shadow-blue-500/20',
  purple: 'border-purple-400/40 shadow-purple-500/20',
  pink: 'border-pink-400/40 shadow-pink-500/20',
  green: 'border-green-400/40 shadow-green-500/20',
  yellow: 'border-yellow-400/40 shadow-yellow-500/20',
  orange: 'border-orange-400/40 shadow-orange-500/20',
};

const iconColors = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
};

const glowColors = {
  cyan: 'from-cyan-400/20 to-blue-400/20',
  blue: 'from-blue-400/20 to-indigo-400/20',
  purple: 'from-purple-400/20 to-pink-400/20',
  pink: 'from-pink-400/20 to-rose-400/20',
  green: 'from-green-400/20 to-emerald-400/20',
  yellow: 'from-yellow-400/20 to-amber-400/20',
  orange: 'from-orange-400/20 to-red-400/20',
};

export function Workspace({ selectedNavItem, isMobile = false, onSelectProject }: WorkspaceProps) {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      setProjectsList(projectsList.map(p => p.id === project.id ? project : p));
      setEditingProject(null);
    } else {
      setProjectsList([project, ...projectsList]);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjectsList(projectsList.filter(p => p.id !== id));
    }
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsCreateDialogOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProject(null);
    setIsCreateDialogOpen(true);
  };

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
                    <span className="text-xs text-cyan-400 font-medium">{projectsList.length}</span>
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
                        <span className="text-xs text-cyan-400 font-medium">{projectsList.length} Active</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400">Manage your content and collaborate with your team</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-400 hover:text-gray-300 text-sm transition-all duration-200">
                    Filter
                  </button>
                  <button 
                    onClick={handleCreateClick}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400 text-sm transition-all duration-200 relative group overflow-hidden"
                  >
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
            {projectsList.map((item, index) => {
              const Icon = item.icon;
              const gradient = colorGradients[item.color as keyof typeof colorGradients] || colorGradients.cyan;
              const accent = colorAccents[item.color as keyof typeof colorAccents] || colorAccents.cyan;
              const iconColor = iconColors[item.color as keyof typeof iconColors] || iconColors.cyan;
              const glow = glowColors[item.color as keyof typeof glowColors] || glowColors.cyan;
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
                            ease: "easeInOut",
                            repeat: isHovered ? Infinity : 0,
                            repeatDelay: 0.5
                          }}
                        />
                      )}
                      
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                      
                      {/* Status badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {item.isStarred && (
                          <div className="p-1.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/10">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          </div>
                        )}
                        <div className="px-2.5 py-1 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                          <span className="text-[10px] font-medium text-white uppercase tracking-wider">{item.status}</span>
                        </div>
                      </div>

                      {/* Action Buttons (Edit/Delete) */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
                          className="p-1.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 hover:bg-black/40 text-white transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteProject(item.id); }}
                          className="p-1.5 rounded-lg bg-black/20 backdrop-blur-md border border-white/10 hover:bg-red-500/40 text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${iconColor}`}>
                            <Icon className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
                          </div>
                          <div>
                            <h3 className={`text-white font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>{item.title}</h3>
                            <p className="text-gray-400 text-xs">{item.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Progress bar */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-gray-500">Progress</span>
                          <span className={`font-medium ${iconColor}`}>{item.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full bg-gradient-to-r ${gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {item.collaborators.map((collab, i) => (
                              <div 
                                key={i} 
                                className="w-6 h-6 rounded-full bg-white/10 border border-[#0d1117] flex items-center justify-center text-[10px] text-white font-medium"
                                title={collab.name}
                              >
                                {collab.initials}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {item.collaborators.length} member{item.collaborators.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs">{item.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <CreateProjectDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
          onSave={handleSaveProject}
          initialData={editingProject}
        />
      </div>
    </div>
  );
}

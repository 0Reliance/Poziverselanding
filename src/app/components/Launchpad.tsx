import { motion } from 'motion/react';
import { Search, ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { launchpadItems, LaunchpadItem } from '../data/launchpad';

interface LaunchpadProps {
  selectedCategory: string;
  isMobile?: boolean;
  onSelectItem: (item: LaunchpadItem) => void;
}

export function Launchpad({ selectedCategory, isMobile = false, onSelectItem }: LaunchpadProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Get apps for selected category or show all
  const getApps = () => {
    if (selectedCategory === 'all') {
      return launchpadItems;
    }
    return launchpadItems.filter(item => item.category === selectedCategory);
  };

  const apps = getApps();
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLaunch = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevent triggering the info panel
    if (url !== '#') {
      window.open(url, '_blank');
    }
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className={`text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}>Launchpad</h1>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs text-cyan-400 font-medium">{filteredApps.length} Apps</span>
                    </div>
                  </div>
                </div>
                <p className={`text-gray-400 ${isMobile ? 'text-sm' : ''}`}>
                  {selectedCategory === 'all' ? 'All your tools and services' : `${selectedCategory} tools`}
                </p>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative flex items-center gap-3 px-4 py-3">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search apps and services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* App Grid */}
        <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-8'}`}>
          {filteredApps.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-400 text-lg mb-2">No apps found</p>
                <p className="text-gray-500 text-sm">Try a different search term</p>
              </div>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              isMobile 
                ? 'grid-cols-2' 
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
            }`}>
              {filteredApps.map((app, index) => {
                const Icon = app.icon;
                return (
                  <motion.button
                    key={app.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => onSelectItem(app)}
                    onMouseEnter={() => setHoveredApp(app.id)}
                    onMouseLeave={() => setHoveredApp(null)}
                    className="relative group text-left"
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${app.color} rounded-2xl blur-xl`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredApp === app.id ? 0.4 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Card */}
                    <div className={`relative ${isMobile ? 'h-32' : 'h-40'} rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer`}>
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                      
                      {/* Animated shimmer */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                        animate={{ 
                          x: hoveredApp === app.id ? ['-100%', '100%'] : '-100%',
                        }}
                        transition={{ 
                          duration: 1.5, 
                          ease: "easeInOut",
                          repeat: hoveredApp === app.id ? Infinity : 0,
                          repeatDelay: 0.5
                        }}
                      />

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-4 text-center z-10">
                        {/* Icon */}
                        <motion.div 
                          className={`${isMobile ? 'mb-2' : 'mb-3'}`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} text-white`} />
                        </motion.div>
                        
                        {/* Name */}
                        <h3 className={`text-white font-semibold mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          {app.name}
                        </h3>
                        
                        {/* Description - Desktop only */}
                        {!isMobile && (
                          <p className="text-gray-500 text-xs leading-tight opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                            {app.description}
                          </p>
                        )}

                        {/* Launch Button Overlay */}
                        {app.url !== '#' && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            initial={false}
                          >
                            <motion.button
                              onClick={(e) => handleLaunch(e, app.url)}
                              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm hover:bg-white/20 hover:scale-105 transition-all shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Launch
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

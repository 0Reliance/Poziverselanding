import { ChevronLeft, Search, Clock, Star, Archive, Folder, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContextualMenuProps {
  isExpanded: boolean;
  selectedItem: string;
  onCollapse: () => void;
}

const menuContent: Record<string, { title: string; items: Array<{ name: string; count?: number; starred?: boolean; trend?: string }> }> = {
  home: {
    title: 'Quick Access',
    items: [
      { name: 'Recent Projects', count: 12, starred: true, trend: '+5' },
      { name: 'Starred Items', count: 8, starred: true },
      { name: 'Shared with Me', count: 24, trend: '+3' },
      { name: 'Archived', count: 45 },
    ],
  },
  projects: {
    title: 'Projects',
    items: [
      { name: 'Active Projects', count: 6, starred: true, trend: '+2' },
      { name: 'In Review', count: 3 },
      { name: 'Completed', count: 18 },
      { name: 'Templates', count: 12 },
    ],
  },
  files: {
    title: 'Files',
    items: [
      { name: 'Documents', count: 156, trend: '+12' },
      { name: 'Images', count: 89 },
      { name: 'Videos', count: 23 },
      { name: 'Audio', count: 45 },
    ],
  },
  bookmarks: {
    title: 'Bookmarks',
    items: [
      { name: 'Important', count: 15, starred: true },
      { name: 'Read Later', count: 28 },
      { name: 'References', count: 42 },
      { name: 'Collections', count: 8 },
    ],
  },
  folders: {
    title: 'Folders',
    items: [
      { name: 'Work', count: 34, starred: true },
      { name: 'Personal', count: 21 },
      { name: 'Archive', count: 67 },
      { name: 'Shared', count: 19, trend: '+4' },
    ],
  },
  profile: {
    title: 'Profile',
    items: [
      { name: 'My Activity', count: 234 },
      { name: 'Collaborations', count: 12, starred: true },
      { name: 'Settings', count: undefined },
      { name: 'Preferences', count: undefined },
    ],
  },
};

export function ContextualMenu({ isExpanded, selectedItem, onCollapse }: ContextualMenuProps) {
  const content = menuContent[selectedItem] || menuContent.home;

  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative flex-shrink-0 z-20 overflow-hidden"
        >
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-r border-white/10">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="relative h-full flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <motion.h2 
                  className="text-white font-semibold flex items-center gap-2"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {content.title}
                </motion.h2>
                <motion.button
                  onClick={onCollapse}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                </motion.button>
              </div>

              {/* Search bar */}
              <motion.div 
                className="relative group"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <div className="absolute inset-0 bg-white/5 rounded-lg border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
                <div className="relative flex items-center gap-2 px-3 py-2">
                  <Search className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-600 outline-none text-sm"
                  />
                </div>
              </motion.div>
            </div>

            {/* Menu items */}
            <div className="flex-1 overflow-y-auto p-2">
              {content.items.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="w-full group relative"
                  whileHover={{ x: 4 }}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  
                  <div className="relative flex items-center gap-3 px-3 py-3 border border-transparent group-hover:border-white/10 rounded-lg transition-colors">
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-400/30 flex items-center justify-center transition-all">
                      <Folder className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        {item.starred && (
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      {item.trend && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <TrendingUp className="w-2.5 h-2.5 text-green-400" />
                          <span className="text-[10px] text-green-400 font-medium">{item.trend}</span>
                        </div>
                      )}
                    </div>

                    {/* Count badge */}
                    {item.count !== undefined && (
                      <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-all">
                        <span className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors font-medium">
                          {item.count}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer with quick actions */}
            <motion.div 
              className="p-4 border-t border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 text-gray-400 hover:text-cyan-400 text-sm transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Recent</span>
                </motion.button>
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 text-gray-400 hover:text-cyan-400 text-sm transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
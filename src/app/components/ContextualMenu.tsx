import { ChevronLeft, Search, Clock, Star, Archive } from 'lucide-react';
import iconSetImage from 'figma:asset/5bd2e2f9ba8e20f67a8919d735aee29897c37a82.png';

interface ContextualMenuProps {
  isExpanded: boolean;
  selectedItem: string;
  onCollapse: () => void;
}

const menuContent: Record<string, { title: string; items: string[] }> = {
  home: {
    title: 'Home',
    items: ['Dashboard', 'Recent Activity', 'Quick Actions', 'Favorites', 'Team Updates'],
  },
  bookmarks: {
    title: 'Bookmarks',
    items: ['All Bookmarks', 'Collections', 'Shared', 'Recently Added', 'Tags'],
  },
  user: {
    title: 'User',
    items: ['Profile', 'Settings', 'Preferences', 'Account', 'Privacy'],
  },
  folder: {
    title: 'Folders',
    items: ['My Folders', 'Shared Folders', 'Recent', 'Archived', 'Templates'],
  },
  files: {
    title: 'Files',
    items: ['All Files', 'Documents', 'Images', 'Downloads', 'Trash'],
  },
  layers: {
    title: 'Layers',
    items: ['Layer 1', 'Layer 2', 'Layer 3', 'Background', 'Effects'],
  },
};

export function ContextualMenu({ isExpanded, selectedItem, onCollapse }: ContextualMenuProps) {
  const content = menuContent[selectedItem] || menuContent.home;
  
  return (
    <div 
      className={`relative flex-shrink-0 z-20 transition-all duration-300 ${
        isExpanded ? 'w-72' : 'w-0'
      }`}
    >
      {isExpanded && (
        <>
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-r border-white/10" />
          
          {/* Menu content */}
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-gray-200 font-medium">{content.title}</h2>
              <button
                onClick={onCollapse}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Collapse menu"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" />
                <div className="relative flex items-center gap-3 px-4 py-3">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Menu items */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-2">
                {content.items.map((item, index) => (
                  <button
                    key={item}
                    className="group w-full relative"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Item background */}
                    <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center">
                        {index === 0 && <Clock className="w-4 h-4 text-cyan-400" />}
                        {index === 1 && <Star className="w-4 h-4 text-blue-400" />}
                        {index === 2 && <Archive className="w-4 h-4 text-purple-400" />}
                        {index > 2 && <div className="w-2 h-2 rounded-full bg-cyan-400/60" />}
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer decoration */}
            <div className="p-4 border-t border-white/10">
              <div className="relative h-20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10" />
                <div className="relative p-4">
                  <p className="text-xs text-gray-400">Quick Access</p>
                  <p className="text-sm text-gray-300 mt-1">Create new project</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

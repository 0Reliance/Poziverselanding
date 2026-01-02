import { Home, Layers, Files, Bookmark, Folder, User } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileTabBarProps {
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'projects', icon: Layers, label: 'Projects' },
  { id: 'files', icon: Files, label: 'Files' },
  { id: 'bookmarks', icon: Bookmark, label: 'Saved' },
];

export function MobileTabBar({ selectedItem, onSelectItem }: MobileTabBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl border-t border-white/10" />
      
      {/* Safe area padding for mobile devices */}
      <div className="relative px-4 pb-safe">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="relative flex flex-col items-center justify-center gap-1 px-4 py-2"
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="mobile-active-tab"
                    className="absolute inset-0 bg-cyan-400/10 rounded-xl border border-cyan-400/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="relative">
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isSelected ? 'text-cyan-400' : 'text-gray-400'
                    }`}
                  />
                  {isSelected && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </div>
                
                <span className={`text-xs transition-colors ${
                  isSelected ? 'text-cyan-400 font-medium' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

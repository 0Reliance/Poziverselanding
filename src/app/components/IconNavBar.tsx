import { House, Bookmark, User, Folder, Files, Layers } from 'lucide-react';
import iconImage from 'figma:asset/4ff60201940ad97cfa244e08e4e65da329332825.png';

interface IconNavBarProps {
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

const navItems = [
  { id: 'home', icon: House, label: 'Home' },
  { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { id: 'user', icon: User, label: 'User' },
  { id: 'folder', icon: Folder, label: 'Folder' },
  { id: 'files', icon: Files, label: 'Files' },
  { id: 'layers', icon: Layers, label: 'Layers' },
];

export function IconNavBar({ selectedItem, onSelectItem }: IconNavBarProps) {
  return (
    <div className="relative w-20 flex-shrink-0 z-30">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-r border-white/10" />
      
      {/* Navigation items */}
      <div className="relative h-full flex flex-col items-center gap-4 py-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              className="group relative w-14 h-14 flex items-center justify-center transition-all duration-300"
              aria-label={item.label}
            >
              {/* Glow effect for selected item */}
              {isSelected && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/30 to-cyan-500/30 rounded-2xl blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-2xl" />
                </>
              )}
              
              {/* Glass card */}
              <div className={`relative w-full h-full rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-white/10 border border-cyan-400/30 shadow-lg shadow-cyan-500/20' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon 
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? 'w-6 h-6 text-cyan-400' 
                        : 'w-5 h-5 text-gray-400 group-hover:text-gray-300'
                    }`} 
                  />
                </div>
                
                {/* Starfield effect dots */}
                <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-white/40 rounded-full" />
                <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-white/30 rounded-full" />
                <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-white/20 rounded-full" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

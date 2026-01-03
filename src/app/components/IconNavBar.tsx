import { Home, Rocket, Users, Folder, Files, Layers, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface IconNavBarProps {
  selectedItem: string;
  onSelectItem: (item: string) => void;
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home', gradient: 'from-cyan-400 to-blue-500', glow: 'cyan-400' },
  { id: 'projects', icon: Layers, label: 'Projects', gradient: 'from-blue-400 to-indigo-500', glow: 'blue-400' },
  { id: 'files', icon: Files, label: 'Files', gradient: 'from-purple-400 to-pink-500', glow: 'purple-400' },
  { id: 'launchpad', icon: Rocket, label: 'Launchpad', gradient: 'from-yellow-400 to-orange-500', glow: 'yellow-400' },
  { id: 'folders', icon: Folder, label: 'Folders', gradient: 'from-green-400 to-emerald-500', glow: 'green-400' },
  { id: 'usercontrol', icon: Users, label: 'User Control', gradient: 'from-pink-400 to-rose-500', glow: 'pink-400' },
];

export function IconNavBar({ selectedItem, onSelectItem }: IconNavBarProps) {
  return (
    <div className="relative w-20 flex-shrink-0 z-20">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-r border-white/10">
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center py-6 gap-2">
        {/* Main navigation items */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = selectedItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Selection indicator bar */}
                <motion.div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b ${item.gradient}`}
                  initial={false}
                  animate={{
                    opacity: isSelected ? 1 : 0,
                    x: isSelected ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon container */}
                <div className="relative">
                  {/* Glow effect background */}
                  <motion.div
                    className={`absolute inset-0 bg-${item.glow} rounded-xl opacity-0 blur-lg`}
                    animate={{
                      opacity: isSelected ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      backgroundColor: `rgb(var(--${item.glow}) / 0.4)`,
                    }}
                  />
                  
                  {/* Button surface */}
                  <motion.div
                    className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    } border backdrop-blur-sm`}
                    animate={{
                      scale: isSelected ? 1 : 1,
                    }}
                  >
                    {/* Gradient overlay on selected */}
                    {isSelected && (
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 rounded-xl`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Icon */}
                    <Icon
                      className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                        isSelected
                          ? 'text-white drop-shadow-[0_0_8px_currentColor]'
                          : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                      style={
                        isSelected
                          ? {
                              filter: `drop-shadow(0 0 8px rgb(var(--${item.glow}) / 0.6))`,
                            }
                          : undefined
                      }
                    />
                    
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '100%', opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                </div>
                
                {/* Tooltip */}
                <motion.div
                  className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap">
                    <span className="text-sm text-white font-medium">{item.label}</span>
                    {/* Tooltip arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-white/20" />
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
        
        {/* Divider */}
        <div className="w-10 h-px bg-white/10" />
        
        {/* Bottom action button */}
        <motion.button
          className="relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 overflow-hidden group">
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            <Sparkles className="w-5 h-5 text-cyan-400 relative z-10 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-cyan-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
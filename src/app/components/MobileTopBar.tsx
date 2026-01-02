import { Menu, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function MobileTopBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="relative h-14 w-full flex-shrink-0 z-50 md:hidden">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl border-b border-white/10" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500" />
              <div className="relative h-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-md rotate-45" />
              </div>
            </div>
            <span className="text-lg text-white font-semibold">poziverse</span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-gray-400" />
            </button>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
            >
              {showMenu ? (
                <X className="w-4 h-4 text-gray-400" />
              ) : (
                <Menu className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setShowMenu(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-white font-semibold mb-4">Menu</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                    Help & Support
                  </button>
                  <div className="my-4 h-px bg-white/10" />
                  <button className="w-full text-left px-4 py-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Bell, Settings, Search, User, LogOut, HelpCircle, Palette, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export function TopNavBar() {
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <div className="relative h-16 w-full flex-shrink-0 z-50">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-6">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden group cursor-pointer">
            {/* Logo background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300" />
            
            {/* Logo symbol */}
            <div className="relative h-full flex items-center justify-center">
              <motion.div 
                className="w-5 h-5 border-2 border-white rounded-lg rotate-45"
                whileHover={{ rotate: 225, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/50 to-blue-500/50 blur-md group-hover:blur-lg transition-all" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl text-white font-semibold tracking-wide">poziverse</span>
            <span className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase">Workspace Orchestrator</span>
          </div>
        </div>
        
        {/* Center section - search (Desktop only - lg+) */}
        <div className="hidden lg:flex items-center gap-2">
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <div className="relative flex items-center gap-3 px-4 py-2.5">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search projects, files, collaborators..."
                className="bg-transparent text-gray-300 placeholder:text-gray-500 outline-none text-sm w-80 xl:w-96"
              />
              <div className="hidden xl:flex items-center gap-1">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-white/5 border border-white/10 rounded font-mono">
                  ⌘
                </kbd>
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-white/5 border border-white/10 rounded font-mono">
                  K
                </kbd>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right section - actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <motion.button 
            className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-200 flex items-center justify-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setHasNotifications(!hasNotifications)}
          >
            <Bell className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            {/* Notification dot with pulse */}
            {hasNotifications && (
              <motion.div 
                className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full border border-black"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-cyan-400/20 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
          </motion.button>
          
          {/* Settings with dropdown */}
          <div className="relative">
            <motion.button 
              className="relative w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-200 flex items-center justify-center group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowSettingsMenu(!showSettingsMenu);
                setShowUserMenu(false);
              }}
            >
              <motion.div
                animate={{ rotate: showSettingsMenu ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Settings className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </motion.div>
              <div className="absolute inset-0 bg-cyan-400/20 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
            </motion.button>
            
            {/* Settings Dropdown */}
            <AnimatePresence>
              {showSettingsMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-56 rounded-xl overflow-hidden"
                >
                  <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm group">
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span>Preferences</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm group">
                        <Palette className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span>Appearance</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm group">
                        <Shield className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span>Privacy & Security</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm group">
                        <HelpCircle className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span>Help & Support</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User menu */}
          <div className="relative ml-2">
            <motion.button
              className="relative h-10 pl-3 pr-2 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/20 cursor-pointer hover:border-cyan-400/40 transition-all duration-200 group flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowSettingsMenu(false);
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/40 flex items-center justify-center">
                <span className="text-xs text-cyan-400 font-semibold">JD</span>
              </div>
              <motion.div
                animate={{ rotate: showUserMenu ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              </motion.div>
            </motion.button>
            
            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-64 rounded-xl overflow-hidden"
                >
                  <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {/* User info header */}
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-500/30 border border-cyan-400/40 flex items-center justify-center">
                          <span className="text-sm text-cyan-400 font-semibold">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium">John Doe</div>
                          <div className="text-gray-400 text-xs truncate">john.doe@poziverse.io</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu items */}
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm group">
                        <User className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors text-sm group">
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                        <span>Account Settings</span>
                      </button>
                      <div className="my-1 h-px bg-white/10" />
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-gray-300 hover:text-red-400 transition-colors text-sm group">
                        <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

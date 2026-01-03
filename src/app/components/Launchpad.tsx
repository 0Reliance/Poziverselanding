import { motion } from 'motion/react';
import { Search, ExternalLink, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface LaunchpadProps {
  selectedCategory: string;
  isMobile?: boolean;
}

// Application data organized by categories
const appCategories = {
  'Development': [
    { name: 'GitHub', description: 'Code repository & collaboration', color: 'from-gray-400 to-gray-600', icon: '🐙', url: 'https://github.com' },
    { name: 'VS Code', description: 'Code editor', color: 'from-blue-400 to-blue-600', icon: '💻', url: 'https://vscode.dev' },
    { name: 'Docker', description: 'Container platform', color: 'from-blue-400 to-cyan-500', icon: '🐳', url: 'https://docker.com' },
    { name: 'Codeserver', description: 'VS Code in browser', color: 'from-blue-500 to-indigo-600', icon: '⚡', url: '#' },
    { name: 'Portainer', description: 'Container management', color: 'from-cyan-400 to-blue-500', icon: '📦', url: '#' },
    { name: 'Proxmox', description: 'Virtualization platform', color: 'from-orange-400 to-red-500', icon: '🔧', url: '#' },
  ],
  'AI & Productivity': [
    { name: 'Gemini', description: 'Google AI assistant', color: 'from-purple-400 to-pink-500', icon: '✨', url: 'https://gemini.google.com' },
    { name: 'Ollama', description: 'Local AI models', color: 'from-blue-400 to-cyan-500', icon: '🦙', url: 'https://ollama.ai' },
    { name: 'NotebookLM', description: 'AI research assistant', color: 'from-blue-400 to-indigo-500', icon: '📓', url: 'https://notebooklm.google' },
    { name: 'Cal.com', description: 'Scheduling platform', color: 'from-gray-700 to-gray-900', icon: '📅', url: 'https://cal.com' },
    { name: 'Keep', description: 'Note taking', color: 'from-yellow-400 to-amber-500', icon: '💡', url: 'https://keep.google.com' },
    { name: 'Memos', description: 'Self-hosted notes', color: 'from-yellow-400 to-orange-500', icon: '📝', url: '#' },
  ],
  'Communication': [
    { name: 'Slack', description: 'Team messaging', color: 'from-purple-400 to-pink-500', icon: '💬', url: 'https://slack.com' },
    { name: 'Discord', description: 'Community chat', color: 'from-indigo-400 to-purple-500', icon: '🎮', url: 'https://discord.com' },
    { name: 'Mattermost', description: 'Self-hosted chat', color: 'from-blue-400 to-blue-600', icon: '💭', url: '#' },
    { name: 'Jira', description: 'Project management', color: 'from-blue-400 to-blue-600', icon: '📊', url: 'https://jira.com' },
    { name: 'Plane', description: 'Project planning', color: 'from-cyan-400 to-blue-500', icon: '✈️', url: '#' },
    { name: 'Answers', description: 'Q&A platform', color: 'from-blue-400 to-cyan-500', icon: '💭', url: '#' },
  ],
  'Infrastructure': [
    { name: 'Nextcloud', description: 'Cloud storage & apps', color: 'from-blue-400 to-cyan-500', icon: '☁️', url: 'https://nextcloud.com' },
    { name: 'Plex', description: 'Media server', color: 'from-yellow-400 to-orange-500', icon: '▶️', url: 'https://plex.tv' },
    { name: 'Home Assistant', description: 'Home automation', color: 'from-cyan-400 to-blue-500', icon: '🏠', url: 'https://home-assistant.io' },
    { name: 'Pi-hole', description: 'Network ad blocker', color: 'from-red-400 to-red-600', icon: '🛡️', url: 'https://pi-hole.net' },
    { name: 'Nginx', description: 'Web server', color: 'from-green-400 to-green-600', icon: '🌐', url: 'https://nginx.org' },
    { name: 'Cloudflare', description: 'CDN & security', color: 'from-orange-400 to-orange-600', icon: '☁️', url: 'https://cloudflare.com' },
  ],
  'Knowledge & Learning': [
    { name: 'Calibre-Web', description: 'Ebook library', color: 'from-teal-400 to-cyan-500', icon: '📚', url: '#' },
    { name: 'Bookstack', description: 'Documentation wiki', color: 'from-blue-400 to-indigo-500', icon: '📖', url: '#' },
    { name: 'Open-Notebook', description: 'Research notes', color: 'from-blue-400 to-blue-600', icon: '📔', url: '#' },
    { name: 'Notediscovery', description: 'Knowledge graph', color: 'from-gray-400 to-gray-600', icon: '🧠', url: '#' },
    { name: 'Surfsense', description: 'Web research', color: 'from-cyan-400 to-blue-500', icon: '🌊', url: '#' },
    { name: 'Hoarder', description: 'Bookmark manager', color: 'from-amber-600 to-orange-700', icon: '📦', url: '#' },
  ],
  'Design & Creative': [
    { name: 'Figma', description: 'Design & prototyping', color: 'from-purple-400 to-pink-500', icon: '🎨', url: 'https://figma.com' },
    { name: 'Affine', description: 'Knowledge canvas', color: 'from-purple-400 to-indigo-500', icon: '📐', url: '#' },
    { name: 'Excalidraw', description: 'Virtual whiteboard', color: 'from-gray-600 to-gray-800', icon: '✏️', url: 'https://excalidraw.com' },
    { name: 'Penpot', description: 'Open-source design', color: 'from-purple-500 to-purple-700', icon: '🖌️', url: 'https://penpot.app' },
    { name: 'Immich', description: 'Photo management', color: 'from-pink-400 to-rose-500', icon: '📸', url: '#' },
    { name: 'Maeple', description: 'Creative workspace', color: 'from-purple-400 to-purple-600', icon: '🍁', url: '#' },
  ],
  'Utilities & Tools': [
    { name: 'Vaultwarden', description: 'Password manager', color: 'from-blue-400 to-blue-600', icon: '🔐', url: '#' },
    { name: 'Uptime', description: 'Service monitoring', color: 'from-green-400 to-emerald-500', icon: '✅', url: '#' },
    { name: 'Kasm', description: 'Browser isolation', color: 'from-blue-400 to-cyan-500', icon: '🔒', url: '#' },
    { name: 'Terminal', description: 'Command line', color: 'from-gray-700 to-gray-900', icon: '⌨️', url: '#' },
    { name: 'Grocy', description: 'Grocery management', color: 'from-gray-600 to-gray-800', icon: '🛒', url: '#' },
    { name: 'Mealie', description: 'Recipe manager', color: 'from-orange-400 to-amber-600', icon: '🍽️', url: '#' },
  ],
  'Data & Analytics': [
    { name: 'Google', description: 'Search & workspace', color: 'from-blue-400 to-red-500', icon: '🔍', url: 'https://google.com' },
    { name: 'Drive', description: 'Cloud storage', color: 'from-yellow-400 to-green-500', icon: '📁', url: 'https://drive.google.com' },
    { name: 'Mixpost', description: 'Social media manager', color: 'from-orange-400 to-pink-500', icon: '📱', url: '#' },
    { name: 'Blinko', description: 'Quick capture', color: 'from-yellow-400 to-amber-500', icon: '👁️', url: '#' },
    { name: 'Khoj', description: 'AI search', color: 'from-blue-400 to-indigo-500', icon: '🔎', url: '#' },
    { name: 'Rustdesk', description: 'Remote desktop', color: 'from-blue-400 to-cyan-600', icon: '🖥️', url: '#' },
  ],
};

export function Launchpad({ selectedCategory, isMobile = false }: LaunchpadProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Get apps for selected category or show all
  const getApps = () => {
    if (selectedCategory === 'all' || !appCategories[selectedCategory as keyof typeof appCategories]) {
      return Object.values(appCategories).flat();
    }
    return appCategories[selectedCategory as keyof typeof appCategories] || [];
  };

  const apps = getApps();
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLaunch = (url: string, name: string) => {
    if (url !== '#') {
      window.open(url, '_blank');
    } else {
      console.log(`Launch ${name}`);
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
              {filteredApps.map((app, index) => (
                <motion.button
                  key={app.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={() => handleLaunch(app.url, app.name)}
                  onMouseEnter={() => setHoveredApp(app.name)}
                  onMouseLeave={() => setHoveredApp(null)}
                  className="relative group"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${app.color} rounded-2xl opacity-0 blur-xl`}
                    animate={{ opacity: hoveredApp === app.name ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Card */}
                  <div className={`relative ${isMobile ? 'h-32' : 'h-40'} rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer`}>
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    
                    {/* Animated shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: hoveredApp === app.name ? '100%' : '-100%' }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                      {/* Icon */}
                      <motion.div 
                        className={`${isMobile ? 'text-4xl mb-2' : 'text-5xl mb-3'}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {app.icon}
                      </motion.div>
                      
                      {/* Name */}
                      <h3 className={`text-white font-semibold mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {app.name}
                      </h3>
                      
                      {/* Description - Desktop only */}
                      {!isMobile && (
                        <p className="text-gray-500 text-xs leading-tight opacity-0 group-hover:opacity-100 transition-opacity">
                          {app.description}
                        </p>
                      )}

                      {/* External link indicator */}
                      {app.url !== '#' && (
                        <motion.div
                          className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ExternalLink className="w-3 h-3 text-white/80" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

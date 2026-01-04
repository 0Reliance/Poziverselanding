import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, Grid, List as ListIcon, Code, Key, Shield, Globe, Server, FileJson, Star } from 'lucide-react';
import { resources } from './data';
import { ResourceItem } from './types';
import { cn } from '@/app/components/ui/utils';

interface ResourcesViewProps {
  selectedCategory: string;
  onSelectItem?: (item: ResourceItem) => void;
}

export function ResourcesView({ selectedCategory, onSelectItem }: ResourcesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filteredItems = resources.filter(item => {
    if (selectedCategory !== 'all' && item.type !== selectedCategory) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'snippet': return <Code className="w-5 h-5" />;
      case 'key': return <Key className="w-5 h-5" />;
      case 'secret': return <Shield className="w-5 h-5" />;
      case 'bookmark': return <Globe className="w-5 h-5" />;
      case 'server': return <Server className="w-5 h-5" />;
      default: return <FileJson className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'snippet': return 'from-blue-400 to-indigo-500';
      case 'key': return 'from-yellow-400 to-orange-500';
      case 'secret': return 'from-red-400 to-pink-500';
      case 'bookmark': return 'from-green-400 to-emerald-500';
      case 'server': return 'from-purple-400 to-violet-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="relative flex-1 z-10 h-full flex flex-col">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
      
      {/* Header */}
      <div className="p-8 border-b border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl text-white font-semibold mb-2">Resources</h1>
            <p className="text-gray-400">Manage your code snippets, keys, and bookmarks</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/5 rounded-lg p-1 flex items-center border border-white/10">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-2 rounded-md transition-colors", viewMode === 'grid' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-2 rounded-md transition-colors", viewMode === 'list' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group max-w-2xl">
          <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-blue-400/30 transition-colors" />
          <div className="relative flex items-center gap-3 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onSelectItem?.(item)}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(item.type)} rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`} />
                
                <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} bg-opacity-10`}>
                      <div className="text-white">
                        {getIconForType(item.type)}
                      </div>
                    </div>
                    {item.isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                  </div>

                  <h3 className="text-white font-medium mb-1 truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs mb-4 truncate">{item.subtitle}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSelectItem?.(item)}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getTypeColor(item.type)} bg-opacity-10`}>
                  <div className="text-white">
                    {getIconForType(item.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs truncate">{item.subtitle}</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-gray-500 text-xs">
                  {item.createdAt}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

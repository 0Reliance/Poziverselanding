import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, Grid, List as ListIcon, Code, Key, Shield, Globe, Server, FileJson, Star, Edit, Trash2 } from 'lucide-react';
import { resources } from './data';
import { ResourceItem } from './types';
import { cn } from '@/app/components/ui/utils';
import { CreateResourceDialog } from './CreateResourceDialog';

interface ResourcesViewProps {
  selectedCategory: string;
  onSelectItem?: (item: ResourceItem) => void;
}

export function ResourcesView({ selectedCategory, onSelectItem }: ResourcesViewProps) {
  const [items, setItems] = useState<ResourceItem[]>(resources);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Dialog State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);

  const filteredItems = items.filter(item => {
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

  const handleSaveResource = (resource: ResourceItem) => {
    if (editingResource) {
      setItems(items.map(item => item.id === resource.id ? resource : item));
      setEditingResource(null);
    } else {
      setItems([resource, ...items]);
    }
  };

  const handleDeleteResource = (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      setItems(items.filter(item => item.id !== id));
      if (onSelectItem) {
        // Deselect if currently selected (optional, but good UX)
        // Since we don't know which one is selected in parent, we can't easily do this here without more props
        // But it's fine for now.
      }
    }
  };

  const handleEditClick = (item: ResourceItem) => {
    setEditingResource(item);
    setIsCreateDialogOpen(true);
  };

  const handleCreateClick = () => {
    setEditingResource(null);
    setIsCreateDialogOpen(true);
  };

  return (
    <div className="relative flex-1 z-10 h-full flex flex-col">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02]" />
      
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
            <button 
              onClick={handleCreateClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 hover:border-blue-400/50 text-blue-400 text-sm transition-all duration-200 relative group overflow-hidden flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Plus className="w-4 h-4 relative" />
              <span className="relative">Add Resource</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative group max-w-2xl">
          <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-blue-400/30 transition-colors" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onSelectItem?.(item)}
                className="relative group cursor-pointer"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(item.type)} rounded-2xl blur-xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === item.id ? 0.4 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors overflow-hidden">
                  {/* Shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                    animate={{ 
                      x: hoveredItem === item.id ? ['-100%', '100%'] : '-100%',
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut",
                      repeat: hoveredItem === item.id ? Infinity : 0,
                      repeatDelay: 0.5
                    }}
                  />

                  <div className="relative flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} bg-opacity-10`}>
                      <div className="text-white">
                        {getIconForType(item.type)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.isFavorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteResource(item.id); }}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
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

                {/* Action Buttons */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteResource(item.id); }}
                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <CreateResourceDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
        onSave={handleSaveResource}
        initialData={editingResource}
      />
    </div>
  );
}

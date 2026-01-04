import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, Grid, List as ListIcon, Copy, ExternalLink, Eye, EyeOff, Clock, Shield, Activity, Star, Trash2, Edit2, Code, Key, FileJson, Globe, CheckCircle2, RotateCw, Tag } from 'lucide-react';
import { resources } from './data';
import { ResourceItem } from './types';
import { cn } from '@/app/components/ui/utils';

// --- Sub-components ---

// 2. List View
function ResourcesList({ 
  category, 
  items, 
  selectedItemId, 
  onSelectItem 
}: { 
  category: string, 
  items: ResourceItem[], 
  selectedItemId: string | null, 
  onSelectItem: (id: string) => void 
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    if (category !== 'all' && item.type !== category) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Mock "Recent" items - just take the first one of the category
  const recentItem = filteredItems.length > 0 ? filteredItems[0] : null;

  // Mock "Popular Tags" - aggregate from filtered items
  const allTags = filteredItems.flatMap(item => item.tags);
  const uniqueTags = Array.from(new Set(allTags)).slice(0, 6);

  return (
    <div className="w-96 border-r border-white/10 flex flex-col bg-black/10 backdrop-blur-md">
      {/* Header */}
      <div className="p-4 border-b border-white/10 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
            <Filter className="w-3 h-3" />
            Filter
          </button>
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <button className="p-1 rounded hover:bg-white/10 text-white"><Grid className="w-3 h-3" /></button>
            <button className="p-1 rounded hover:bg-white/10 text-gray-500"><ListIcon className="w-3 h-3" /></button>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-lg shadow-blue-500/20">
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Main List */}
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={item.id}
              onClick={() => onSelectItem(item.id)}
              className={cn(
                "p-3 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden",
                selectedItemId === item.id
                  ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                  : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
              )}
            >
              {selectedItemId === item.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
              )}
              
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-1.5 rounded-lg",
                    selectedItemId === item.id ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-gray-400"
                  )}>
                    {getIconForType(item.type)}
                  </div>
                  <div>
                    <h3 className={cn("text-sm font-medium", selectedItemId === item.id ? "text-white" : "text-gray-200")}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
                {item.isFavorite && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                {item.metadata.description}
              </p>

              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 transition-colors">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Section */}
        {recentItem && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recent in {category === 'all' ? 'Items' : category + 's'}
              </h3>
              <Clock className="w-3 h-3 text-gray-600" />
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <div className="p-1.5 rounded-lg bg-white/10 text-gray-400">
                {getIconForType(recentItem.type)}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300">{recentItem.title}</h4>
                <p className="text-xs text-gray-500">{recentItem.subtitle} • 3h ago</p>
              </div>
            </div>
          </div>
        )}

        {/* Popular Tags Section */}
        {uniqueTags.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Popular Tags
              </h3>
              <Tag className="w-3 h-3 text-gray-600" />
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getIconForType(type: string) {
  switch (type) {
    case 'snippet': return <Code className="w-4 h-4" />;
    case 'key': return <Key className="w-4 h-4" />;
    case 'secret': return <Shield className="w-4 h-4" />;
    case 'bookmark': return <ExternalLink className="w-4 h-4" />;
    default: return <FileJson className="w-4 h-4" />;
  }
}

// 3. Detail Views
function DetailHeader({ item }: { item: ResourceItem }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-xl">
          {getIconForType(item.type)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{item.title}</h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
            {item.subtitle && <span className="text-gray-500 text-sm">• {item.subtitle}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/10 text-yellow-500 transition-colors">
          <Star className={cn("w-5 h-5", item.isFavorite ? "fill-yellow-500" : "")} />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <Edit2 className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function SnippetDetail({ item }: { item: ResourceItem }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20 font-medium">
          {item.metadata.language}
        </span>
        {item.metadata.usageCount && (
          <span className="px-2.5 py-1 rounded-md bg-white/5 text-gray-400 text-xs border border-white/10">
            {item.metadata.usageCount}
          </span>
        )}
      </div>

      <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Code</span>
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm text-gray-300 leading-relaxed">
            <code>{item.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function KeyDetail({ item }: { item: ResourceItem }) {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="space-y-8">
      {/* Key Display */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">API Key</label>
          <button 
            onClick={() => setShowKey(!showKey)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
          >
            {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm bg-black/30 rounded-lg px-4 py-3 text-gray-300 border border-white/5 tracking-wide">
            {showKey ? item.metadata.value : '•'.repeat(40)}
          </code>
          <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Usage Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0A0A0A] rounded-xl p-5 border border-white/10">
            <div className="text-xs text-gray-500 mb-2">Today</div>
            <div className="text-3xl font-bold text-white">{item.metadata.usage?.today || '0'}</div>
          </div>
          <div className="bg-[#0A0A0A] rounded-xl p-5 border border-white/10">
            <div className="text-xs text-gray-500 mb-2">This Week</div>
            <div className="text-3xl font-bold text-white">{item.metadata.usage?.thisWeek || '0'}</div>
          </div>
          <div className="bg-[#0A0A0A] rounded-xl p-5 border border-white/10">
            <div className="text-xs text-gray-500 mb-2">This Month</div>
            <div className="text-3xl font-bold text-white">{item.metadata.usage?.thisMonth || '0'}</div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      {item.metadata.permissions && (
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</h3>
          <div className="flex flex-wrap gap-2">
            {item.metadata.permissions.map((perm: string) => (
              <span key={perm} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20 font-medium">
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata List */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Metadata</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Environment</div>
            <div className="text-sm text-white font-medium">{item.metadata.environment}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Service</div>
            <div className="text-sm text-white font-medium">{item.metadata.service}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Rate Limit</div>
            <div className="text-sm text-white font-medium">{item.metadata.rateLimit}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">Expires</div>
            <div className="text-sm text-red-400 font-medium">{item.metadata.expires}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecretDetail({ item }: { item: ResourceItem }) {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="space-y-8">
      {/* Secret Value */}
      <div className="bg-red-500/5 rounded-xl border border-red-500/20 p-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-red-400 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Secret Value
          </label>
          <button 
            onClick={() => setShowSecret(!showSecret)}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
          >
            {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showSecret ? 'Hide' : 'Reveal'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm bg-black/30 rounded-lg px-4 py-3 text-gray-300 border border-red-500/10 tracking-wide">
            {showSecret ? item.metadata.value : '•'.repeat(40)}
          </code>
          <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Rotation Schedule */}
      <div className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
        <div className="flex items-center gap-2 mb-6 text-amber-500">
          <RotateCw className="w-4 h-4" />
          <h3 className="text-sm font-bold">Rotation Schedule</h3>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-amber-500/60 mb-1">Last Rotated</div>
            <div className="text-sm text-amber-100 font-medium">{item.metadata.lastRotated}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-amber-500/60 mb-1">Next Rotation</div>
            <div className="text-sm text-amber-100 font-medium">{item.metadata.nextRotation}</div>
          </div>
        </div>
      </div>

      {/* Associated Services */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Associated Services</h3>
        <div className="space-y-2">
          {item.metadata.associatedServices?.map((service: string) => (
            <div key={service} className="flex items-center gap-3 p-4 rounded-xl bg-[#0A0A0A] border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-300">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Access */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recent Access</h3>
        <div className="space-y-2">
          {item.metadata.recentAccess?.map((access: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-[#0A0A0A] border border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-300">{access.service}</span>
              </div>
              <span className="text-xs text-gray-500">{access.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookmarkDetail({ item }: { item: ResourceItem }) {
  return (
    <div className="space-y-6">
      <div className="bg-purple-500/5 rounded-xl border border-purple-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">URL</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-black/30 rounded-lg px-4 py-3 text-sm text-gray-300 border border-purple-500/10 truncate">
            {item.metadata.url}
          </div>
          <a 
            href={item.metadata.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            Open URL
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Information</h3>
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <div className="text-xs text-gray-500 mb-1">Category</div>
            <div className="text-sm text-white">{item.metadata.category}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Last Visited</div>
            <div className="text-sm text-white">{item.metadata.lastVisited}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Notes</div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-sm text-gray-300 leading-relaxed">
              {item.metadata.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Main Container
export function ResourcesView({ selectedCategory }: { selectedCategory: string }) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>('b1');

  const selectedItem = resources.find(r => r.id === selectedItemId);

  return (
    <div className="flex h-full w-full bg-transparent overflow-hidden">
      {/* Column 1: List */}
      <ResourcesList 
        category={selectedCategory} 
        items={resources} 
        selectedItemId={selectedItemId}
        onSelectItem={setSelectedItemId}
      />

      {/* Column 2: Detail */}
      <div className="flex-1 overflow-y-auto">
        {selectedItem ? (
          <div className="max-w-4xl mx-auto p-8">
            <DetailHeader item={selectedItem} />
            
            <div className="mt-8">
              {selectedItem.type === 'snippet' && <SnippetDetail item={selectedItem} />}
              {selectedItem.type === 'key' && <KeyDetail item={selectedItem} />}
              {selectedItem.type === 'secret' && <SecretDetail item={selectedItem} />}
              {selectedItem.type === 'bookmark' && <BookmarkDetail item={selectedItem} />}
            </div>

            {/* Common Tags Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-[#0A0A0A] hover:bg-white/10 text-gray-300 text-sm border border-white/10 transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an item to view details
          </div>
        )}
      </div>
    </div>
  );
}

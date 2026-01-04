import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Plus, Grid, List as ListIcon, Copy, ExternalLink, Eye, EyeOff, Clock, Shield, Activity, Star, Trash2, Edit2, Code, Key, FileJson, Globe, CheckCircle2, RotateCw, Tag, Server, MoreHorizontal, Terminal, Play, StopCircle, Cpu, HardDrive, Database, Link } from 'lucide-react';
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
    case 'bookmark': return <Globe className="w-4 h-4" />;
    case 'server': return <Server className="w-4 h-4" />;
    case 'other': return <MoreHorizontal className="w-4 h-4" />;
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
        <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30 font-medium">
          {item.metadata.language}
        </span>
        {item.metadata.usageCount && (
          <span className="px-2.5 py-1 rounded-md bg-white/10 text-gray-300 text-xs border border-white/20">
            {item.metadata.usageCount}
          </span>
        )}
      </div>

      <div className="bg-[#0d1117] rounded-xl border border-white/20 overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Code</span>
          <button className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/5">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm text-gray-200 leading-relaxed">
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
      <div className="bg-white/10 rounded-xl border border-white/20 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">API Key</label>
          <button 
            onClick={() => setShowKey(!showKey)}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/5"
          >
            {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm bg-black/40 rounded-lg px-4 py-3 text-gray-200 border border-white/10 tracking-wide shadow-inner">
            {showKey ? item.metadata.value : '•'.repeat(40)}
          </code>
          <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Usage Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0A0A0A]/80 rounded-xl p-5 border border-white/20 shadow-md">
            <div className="text-xs text-gray-400 mb-2">Today</div>
            <div className="text-3xl font-bold text-white">{item.metadata.usage?.today || '0'}</div>
          </div>
          <div className="bg-[#0A0A0A]/80 rounded-xl p-5 border border-white/20 shadow-md">
            <div className="text-xs text-gray-400 mb-2">This Week</div>
            <div className="text-3xl font-bold text-white">{item.metadata.usage?.thisWeek || '0'}</div>
          </div>
          <div className="bg-[#0A0A0A]/80 rounded-xl p-5 border border-white/20 shadow-md">
            <div className="text-xs text-gray-400 mb-2">This Month</div>
            <div className="text-3xl font-bold text-white">{item.metadata.usage?.thisMonth || '0'}</div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      {item.metadata.permissions && (
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Permissions</h3>
          <div className="flex flex-wrap gap-2">
            {item.metadata.permissions.map((perm: string) => (
              <span key={perm} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30 font-medium">
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Metadata List */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Metadata</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Environment</div>
            <div className="text-sm text-white font-medium">{item.metadata.environment}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Service</div>
            <div className="text-sm text-white font-medium">{item.metadata.service}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Rate Limit</div>
            <div className="text-sm text-white font-medium">{item.metadata.rateLimit}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Expires</div>
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
      <div className="bg-red-500/10 rounded-xl border border-red-500/20 p-6 shadow-lg shadow-red-500/5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-red-400 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-3 h-3" />
            Secret Value
          </label>
          <button 
            onClick={() => setShowSecret(!showSecret)}
            className="flex items-center gap-1.5 text-xs text-gray-200 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded border border-white/5"
          >
            {showSecret ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showSecret ? 'Hide' : 'Reveal'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm bg-black/40 rounded-lg px-4 py-3 text-gray-200 border border-red-500/20 tracking-wide shadow-inner">
            {showSecret ? item.metadata.value : '•'.repeat(40)}
          </code>
          <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Rotation Schedule */}
      <div className="bg-amber-500/10 rounded-xl border border-amber-500/20 p-6 shadow-lg shadow-amber-500/5">
        <div className="flex items-center gap-2 mb-6 text-amber-500">
          <RotateCw className="w-4 h-4" />
          <h3 className="text-sm font-bold">Rotation Schedule</h3>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-amber-500/80 mb-1">Last Rotated</div>
            <div className="text-sm text-amber-100 font-medium">{item.metadata.lastRotated}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-amber-500/80 mb-1">Next Rotation</div>
            <div className="text-sm text-amber-100 font-medium">{item.metadata.nextRotation}</div>
          </div>
        </div>
      </div>

      {/* Associated Services */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Associated Services</h3>
        <div className="space-y-2">
          {item.metadata.associatedServices?.map((service: string) => (
            <div key={service} className="flex items-center gap-3 p-4 rounded-xl bg-[#0A0A0A]/80 border border-white/20 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-200">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Access */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Recent Access</h3>
        <div className="space-y-2">
          {item.metadata.recentAccess?.map((access: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-[#0A0A0A]/80 border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-200">{access.service}</span>
              </div>
              <span className="text-xs text-gray-400">{access.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookmarkDetail({ item }: { item: ResourceItem }) {
  // Find related bookmarks (same category)
  const relatedBookmarks = resources.filter(r => 
    r.type === 'bookmark' && 
    r.id !== item.id && 
    r.metadata.category === item.metadata.category
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="bg-purple-500/10 rounded-xl border border-purple-500/20 p-6 shadow-lg shadow-purple-500/5">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium text-purple-400">URL</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-black/40 rounded-lg px-4 py-3 text-sm text-gray-200 border border-purple-500/20 truncate shadow-inner font-mono">
            {item.metadata.url}
          </div>
          <a 
            href={item.metadata.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            Open URL
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Description</h3>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 leading-relaxed shadow-sm">
              {item.metadata.description}
            </div>
          </div>
          
          {relatedBookmarks.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                More in {item.metadata.category}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {relatedBookmarks.map(related => (
                  <div key={related.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="p-2 rounded bg-purple-500/10 text-purple-400">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-200">{related.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[300px]">{related.metadata.url}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Metadata</h3>
            <div>
              <div className="text-xs text-gray-500 mb-1">Category</div>
              <div className="text-sm text-white font-medium flex items-center gap-2">
                <Tag className="w-3 h-3 text-purple-400" />
                {item.metadata.category}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Last Visited</div>
              <div className="text-sm text-white font-medium flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-400" />
                {item.metadata.lastVisited}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServerDetail({ item }: { item: ResourceItem }) {
  const isLocal = item.metadata.provider === 'local';
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});

  const toggleCredential = (key: string) => {
    setShowCredentials(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Status Header */}
      <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]",
            item.metadata.status === 'online' ? "bg-emerald-500 text-emerald-500" : "bg-red-500 text-red-500"
          )} />
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {item.metadata.status === 'online' ? 'System Online' : 'System Offline'}
            </h3>
            <p className="text-sm text-gray-400">
              {isLocal ? `Running on ${item.metadata.host}:${item.metadata.port}` : `Region: ${item.metadata.region}`}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {isLocal ? (
            <>
              <button className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors border border-emerald-500/30">
                <Play className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors border border-red-500/30">
                <StopCircle className="w-5 h-5" />
              </button>
            </>
          ) : (
            <a 
              href={item.metadata.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 flex items-center gap-2 text-sm font-medium"
            >
              Open Dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Services / Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {isLocal ? (
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Active Services</h3>
              <div className="space-y-2">
                {item.metadata.services?.map((service: any) => (
                  <div key={service.name} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-gray-200">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-gray-500">:{service.port}</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Credentials</h3>
              <div className="space-y-3">
                {item.metadata.credentials?.map((cred: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-400">{cred.key}</span>
                      <button 
                        onClick={() => toggleCredential(cred.key)}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        {showCredentials[cred.key] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs font-mono bg-black/30 p-2 rounded text-gray-300 truncate">
                        {showCredentials[cred.key] ? cred.value : '•'.repeat(30)}
                      </code>
                      <button className="p-1.5 hover:bg-white/10 rounded text-gray-400">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {isLocal ? (
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Quick Commands</h3>
              <div className="space-y-2">
                {item.metadata.commands?.map((cmd: any) => (
                  <div key={cmd.label} className="group p-3 rounded-xl bg-[#0d1117] border border-white/10 hover:border-blue-500/30 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors">{cmd.label}</span>
                      <Terminal className="w-3 h-3 text-gray-600 group-hover:text-blue-500" />
                    </div>
                    <code className="text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">
                      $ {cmd.cmd}
                    </code>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Quick Links</h3>
              <div className="grid grid-cols-1 gap-2">
                {item.metadata.links?.map((link: any) => (
                  <a 
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  >
                    <span className="text-sm text-gray-300 group-hover:text-white">{link.label}</span>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NoteDetail({ item }: { item: ResourceItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(item.content || '');

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-white/10 text-xs text-gray-400 border border-white/10">
            {item.metadata.format?.toUpperCase() || 'TEXT'}
          </span>
          <span className="text-xs text-gray-500">
            Last edited: {item.metadata.lastEdited}
          </span>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2",
            isEditing 
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
              : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
          )}
        >
          <Edit2 className="w-3 h-3" />
          {isEditing ? 'Done Editing' : 'Edit Note'}
        </button>
      </div>

      <div className="flex-1 bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-inner relative">
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-transparent p-6 text-sm font-mono text-gray-300 focus:outline-none resize-none leading-relaxed"
            placeholder="Start typing..."
          />
        ) : (
          <div className="w-full h-full p-8 overflow-y-auto prose prose-invert prose-sm max-w-none">
            {/* Simple markdown-like rendering for now */}
            {content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold text-white mb-4 mt-2">{line.replace('# ', '')}</h1>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-gray-200 mb-3 mt-6 pb-2 border-b border-white/10">{line.replace('## ', '')}</h2>;
              if (line.startsWith('- [ ] ')) return <div key={i} className="flex items-center gap-2 my-1"><div className="w-4 h-4 rounded border border-gray-600" /><span className="text-gray-300">{line.replace('- [ ] ', '')}</span></div>;
              if (line.startsWith('- [x] ')) return <div key={i} className="flex items-center gap-2 my-1"><div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div><span className="text-gray-500 line-through">{line.replace('- [x] ', '')}</span></div>;
              if (line.startsWith('- ')) return <li key={i} className="ml-4 text-gray-300 my-1">{line.replace('- ', '')}</li>;
              if (line.match(/^\d+\. /)) return <div key={i} className="ml-4 text-gray-300 my-1 flex gap-2"><span className="text-gray-500">{line.split('.')[0]}.</span><span>{line.split('. ')[1]}</span></div>;
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} className="text-gray-300 my-1 leading-relaxed">{line}</p>;
            })}
          </div>
        )}
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
      <div className="flex-1 overflow-y-auto bg-white/[0.02] backdrop-blur-sm relative">
        {/* Background gradient for detail view */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        
        {selectedItem ? (
          <div className="max-w-4xl mx-auto p-8 relative">
            <DetailHeader item={selectedItem} />
            
            <div className="mt-8">
              {selectedItem.type === 'snippet' && <SnippetDetail item={selectedItem} />}
              {selectedItem.type === 'key' && <KeyDetail item={selectedItem} />}
              {selectedItem.type === 'secret' && <SecretDetail item={selectedItem} />}
              {selectedItem.type === 'bookmark' && <BookmarkDetail item={selectedItem} />}
              {selectedItem.type === 'server' && <ServerDetail item={selectedItem} />}
              {selectedItem.type === 'other' && <NoteDetail item={selectedItem} />}
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

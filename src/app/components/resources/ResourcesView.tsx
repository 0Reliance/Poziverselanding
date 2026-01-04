import { useState } from 'react';
import { Copy, ExternalLink, Eye, EyeOff, Clock, Shield, Activity, Star, Trash2, Edit2, Code, Key, FileJson, Globe } from 'lucide-react';
import { resources } from './data';
import { ResourceItem } from './types';
import { cn } from '@/app/components/ui/utils';

// --- Sub-components ---

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
      <div className="bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-400 font-mono">{item.metadata.language}</span>
            {item.metadata.usageCount && (
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                {item.metadata.usageCount}
              </span>
            )}
          </div>
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="font-mono text-sm text-gray-300">
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
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {showKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm bg-black/30 rounded-lg px-4 py-3 text-gray-300 border border-white/5">
            {showKey ? item.metadata.value : '•'.repeat(40)}
          </code>
          <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
            <Copy className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-xs text-gray-500 mb-1">Today</div>
          <div className="text-2xl font-bold text-white">{item.metadata.usage?.today || '0'}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-xs text-gray-500 mb-1">This Week</div>
          <div className="text-2xl font-bold text-white">{item.metadata.usage?.thisWeek || '0'}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="text-xs text-gray-500 mb-1">This Month</div>
          <div className="text-2xl font-bold text-white">{item.metadata.usage?.thisMonth || '0'}</div>
        </div>
      </div>

      {/* Metadata List */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Metadata</h3>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <div className="text-xs text-gray-500 mb-1">Environment</div>
            <div className="text-sm text-white">{item.metadata.environment}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Service</div>
            <div className="text-sm text-white">{item.metadata.service}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Rate Limit</div>
            <div className="text-sm text-white">{item.metadata.rateLimit}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Expires</div>
            <div className="text-sm text-red-400">{item.metadata.expires}</div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      {item.metadata.permissions && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Permissions</h3>
          <div className="flex flex-wrap gap-2">
            {item.metadata.permissions.map((perm: string) => (
              <span key={perm} className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                {perm}
              </span>
            ))}
          </div>
        </div>
      )}
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
            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
          >
            {showSecret ? 'Hide' : 'Reveal'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-sm bg-black/30 rounded-lg px-4 py-3 text-gray-300 border border-red-500/10">
            {showSecret ? item.metadata.value : '•'.repeat(40)}
          </code>
          <button className="p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors">
            <Copy className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {/* Rotation Schedule */}
      <div className="bg-amber-500/5 rounded-xl border border-amber-500/20 p-6">
        <div className="flex items-center gap-2 mb-4 text-amber-400">
          <Clock className="w-4 h-4" />
          <h3 className="text-sm font-medium">Rotation Schedule</h3>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-xs text-amber-500/70 mb-1">Last Rotated</div>
            <div className="text-sm text-amber-100">{item.metadata.lastRotated}</div>
          </div>
          <div>
            <div className="text-xs text-amber-500/70 mb-1">Next Rotation</div>
            <div className="text-sm text-amber-100">{item.metadata.nextRotation}</div>
          </div>
        </div>
      </div>

      {/* Associated Services */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Associated Services</h3>
        <div className="space-y-2">
          {item.metadata.associatedServices?.map((service: string) => (
            <div key={service} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-gray-200">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Access */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Recent Access</h3>
        <div className="space-y-2">
          {item.metadata.recentAccess?.map((access: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <Activity className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-200">{access.service}</span>
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
export function ResourcesView({ selectedResourceId }: { selectedResourceId: string }) {
  const selectedItem = resources.find(r => r.id === selectedResourceId);

  return (
    <div className="flex h-full w-full bg-[#09090b] overflow-hidden">
      {/* Detail View Only */}
      <div className="flex-1 overflow-y-auto bg-black/20">
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
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-sm border border-white/10 transition-colors cursor-pointer">
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

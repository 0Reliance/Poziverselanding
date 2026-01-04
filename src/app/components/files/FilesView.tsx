import { motion } from 'motion/react';
import { useState } from 'react';
import { HardDrive, Cloud, Server, Database, Laptop, Network, Plus, MoreVertical, RefreshCw, ExternalLink, Trash2, Edit } from 'lucide-react';
import { fileSources, FileSource } from '../../data/files';
import { CreateFileSourceDialog } from './CreateFileSourceDialog';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/app/components/ui/dropdown-menu';

const colorGradients = {
  cyan: 'from-cyan-500/20 to-cyan-600/30',
  blue: 'from-blue-500/20 to-blue-600/30',
  purple: 'from-purple-500/20 to-purple-600/30',
  pink: 'from-pink-500/20 to-pink-600/30',
  green: 'from-green-500/20 to-green-600/30',
  yellow: 'from-yellow-500/20 to-yellow-600/30',
  orange: 'from-orange-500/20 to-orange-600/30',
};

const colorAccents = {
  cyan: 'border-cyan-400/40 shadow-cyan-500/20',
  blue: 'border-blue-400/40 shadow-blue-500/20',
  purple: 'border-purple-400/40 shadow-purple-500/20',
  pink: 'border-pink-400/40 shadow-pink-500/20',
  green: 'border-green-400/40 shadow-green-500/20',
  yellow: 'border-yellow-400/40 shadow-yellow-500/20',
  orange: 'border-orange-400/40 shadow-orange-500/20',
};

const iconColors = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  orange: 'text-orange-400',
};

export function FilesView() {
  const [sources, setSources] = useState<FileSource[]>(fileSources);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<FileSource | null>(null);

  const handleSaveSource = (source: FileSource) => {
    if (editingSource) {
      setSources(sources.map(s => s.id === source.id ? source : s));
      setEditingSource(null);
    } else {
      setSources([...sources, source]);
    }
  };

  const handleDeleteSource = (id: string) => {
    if (confirm('Are you sure you want to remove this file source?')) {
      setSources(sources.filter(s => s.id !== id));
    }
  };

  const handleEditClick = (source: FileSource) => {
    setEditingSource(source);
    setIsCreateDialogOpen(true);
  };

  const handleCreateClick = () => {
    setEditingSource(null);
    setIsCreateDialogOpen(true);
  };

  const totalUsed = sources.reduce((acc, s) => acc + s.capacity.used, 0);
  const totalCapacity = sources.reduce((acc, s) => acc + s.capacity.total, 0);
  const totalUsedGB = totalUsed.toFixed(1);
  const totalCapacityGB = totalCapacity.toFixed(1);

  return (
    <div className="relative flex-1 z-10 h-full flex flex-col">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02]" />
      
      {/* Header */}
      <div className="border-b border-white/10 p-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl text-white">Files & Storage</h1>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs text-purple-400 font-medium">{sources.length} Sources</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400">Manage cloud drives, servers, and local storage connections</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <div className="text-sm text-gray-400 mb-1">Total Storage</div>
                <div className="text-white font-mono">{totalUsedGB}GB <span className="text-gray-500">/ {totalCapacityGB}GB</span></div>
             </div>
             <div className="h-8 w-px bg-white/10 hidden md:block"></div>
            <button 
              onClick={handleCreateClick}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/50 text-purple-400 text-sm transition-all duration-200 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Source</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.map((source, index) => {
            const Icon = source.icon;
            const usagePercent = (source.capacity.used / source.capacity.total) * 100;
            
            return (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colorAccents[source.color].split(' ')[1]}`}
              >
                {/* Status Indicator */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    source.status === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                    source.status === 'syncing' ? 'bg-blue-500 animate-pulse' : 
                    'bg-red-500'
                  }`} />
                  <span className="text-xs text-gray-400 capitalize">{source.status}</span>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="ml-2 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                      <DropdownMenuItem onClick={() => handleEditClick(source)} className="hover:bg-white/10 cursor-pointer">
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                        <RefreshCw className="w-4 h-4 mr-2" /> Sync Now
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteSource(source.id)} className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                        <Trash2 className="w-4 h-4 mr-2" /> Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${colorGradients[source.color]} border border-white/10 shadow-inner`}>
                    <Icon className={`w-6 h-6 ${iconColors[source.color]}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {source.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="capitalize">{source.provider}</span>
                      <span>•</span>
                      <span className="capitalize">{source.type}</span>
                    </div>
                  </div>
                </div>

                {/* Path */}
                <div className="mb-6 p-3 rounded-lg bg-black/20 border border-white/5 font-mono text-xs text-gray-400 truncate">
                  {source.path}
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Storage Usage</span>
                    <span className="text-white">{source.capacity.used}GB / {source.capacity.total}GB</span>
                  </div>
                  <Progress value={usagePercent} className="h-1.5 bg-white/10" indicatorClassName={`bg-${source.color}-500`} />
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3" />
                    <span>Synced {source.lastSync}</span>
                  </div>
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <span>Browse Files</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <CreateFileSourceDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSave={handleSaveSource}
        initialData={editingSource}
      />
    </div>
  );
}

import { Calendar, User, Tag, Clock, FileText, Eye } from 'lucide-react';

export function MetadataSidebar() {
  const metadata = [
    { label: 'Created', value: 'Dec 15, 2025', icon: Calendar },
    { label: 'Modified', value: '2 hours ago', icon: Clock },
    { label: 'Owner', value: 'John Doe', icon: User },
    { label: 'Type', value: 'Document', icon: FileText },
    { label: 'Tags', value: 'Design, Work', icon: Tag },
    { label: 'Views', value: '142', icon: Eye },
  ];
  
  return (
    <div className="relative w-80 flex-shrink-0 z-20">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-l border-white/10" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-gray-200 font-medium">Document Info</h2>
          <p className="text-sm text-gray-500 mt-1">Metadata and context</p>
        </div>
        
        {/* Preview section */}
        <div className="p-6 border-b border-white/10">
          <div className="relative h-40 rounded-xl overflow-hidden">
            {/* Glassmorphic preview card */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10" />
            
            {/* Starfield effect */}
            <div className="absolute top-4 left-6 w-1 h-1 bg-white/40 rounded-full" />
            <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-white/30 rounded-full" />
            <div className="absolute bottom-6 left-10 w-0.5 h-0.5 bg-white/20 rounded-full" />
            <div className="absolute bottom-10 right-6 w-1 h-1 bg-white/25 rounded-full" />
            <div className="absolute top-12 left-16 w-0.5 h-0.5 bg-white/35 rounded-full" />
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <p className="text-sm text-gray-300">Project Alpha</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Metadata list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {metadata.map((item) => {
            const Icon = item.icon;
            
            return (
              <div key={item.label} className="group relative">
                {/* Background */}
                <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-200" />
                
                {/* Content */}
                <div className="relative p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="text-sm text-gray-300 truncate">{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Activity section */}
        <div className="p-6 border-t border-white/10">
          <h3 className="text-sm text-gray-400 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Edited', time: '2h ago' },
              { action: 'Commented', time: '5h ago' },
              { action: 'Shared', time: '1d ago' },
            ].map((activity, index) => (
              <div key={index} className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-lg border border-white/5" />
                <div className="relative p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-400">{activity.action}</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="p-6">
          <div className="relative h-16 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-white/10" />
            <div className="relative h-full flex items-center justify-center">
              <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

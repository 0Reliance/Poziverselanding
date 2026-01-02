import { 
  Wifi, 
  GitBranch, 
  AlertCircle, 
  CheckCircle, 
  Terminal, 
  Code, 
  Database, 
  Activity, 
  Cpu,
  CircleAlert,
  CircleCheck,
  PanelBottomOpen,
  PanelRightOpen,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

interface BottomStatusBarProps {
  onToggleTerminal: () => void;
  onToggleOutput: () => void;
  onToggleProblems: () => void;
  onToggleSidebar: () => void;
  isTerminalOpen: boolean;
  isOutputOpen: boolean;
  isProblemsOpen: boolean;
  isSidebarOpen: boolean;
}

export function BottomStatusBar({
  onToggleTerminal,
  onToggleOutput,
  onToggleProblems,
  onToggleSidebar,
  isTerminalOpen,
  isOutputOpen,
  isProblemsOpen,
  isSidebarOpen,
}: BottomStatusBarProps) {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'syncing'>('connected');
  const [errors] = useState(2);
  const [warnings] = useState(5);

  return (
    <div className="relative h-7 w-full flex-shrink-0 z-40">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-t border-white/10" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-3 text-xs">
        {/* Left section - Status indicators */}
        <div className="flex items-center gap-4">
          {/* Connection status */}
          <button 
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 transition-colors group"
            onClick={() => {
              const statuses: Array<'connected' | 'disconnected' | 'syncing'> = ['connected', 'disconnected', 'syncing'];
              const currentIndex = statuses.indexOf(connectionStatus);
              setConnectionStatus(statuses[(currentIndex + 1) % statuses.length]);
            }}
          >
            <Wifi className={`w-3 h-3 ${
              connectionStatus === 'connected' ? 'text-green-400' : 
              connectionStatus === 'syncing' ? 'text-yellow-400' : 
              'text-red-400'
            }`} />
            <span className="text-gray-400 group-hover:text-gray-300">
              {connectionStatus === 'connected' ? 'Connected' : 
               connectionStatus === 'syncing' ? 'Syncing...' : 
               'Disconnected'}
            </span>
          </button>

          <div className="w-px h-4 bg-white/10" />

          {/* Branch/Workspace info */}
          <button className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 transition-colors group">
            <GitBranch className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-400 group-hover:text-gray-300">main</span>
          </button>

          <div className="w-px h-4 bg-white/10" />

          {/* Errors and Warnings */}
          <button 
            className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 transition-colors group"
            onClick={onToggleProblems}
          >
            <CircleAlert className="w-3 h-3 text-red-400" />
            <span className="text-gray-400 group-hover:text-gray-300">{errors}</span>
            <CircleCheck className="w-3 h-3 text-yellow-400 ml-2" />
            <span className="text-gray-400 group-hover:text-gray-300">{warnings}</span>
          </button>

          <div className="w-px h-4 bg-white/10" />

          {/* Sync/Activity indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5">
            <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
            <span className="text-gray-400">Workspace active</span>
          </div>
        </div>

        {/* Center section - Current status message */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-0.5 rounded-md bg-white/5 border border-white/10">
          <CheckCircle className="w-3 h-3 text-green-400" />
          <span className="text-gray-400">Ready</span>
        </div>

        {/* Right section - Panel toggles and indicators */}
        <div className="flex items-center gap-1">
          {/* Environment/Language */}
          <button className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 transition-colors group">
            <Code className="w-3 h-3 text-purple-400" />
            <span className="text-gray-400 group-hover:text-gray-300">TypeScript</span>
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Resource indicators */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-400">24%</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10">
            <Database className="w-3 h-3 text-blue-400" />
            <span className="text-gray-400">1.2GB</span>
          </div>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Panel switchers - VSCode style */}
          <button 
            onClick={onToggleOutput}
            className={`p-1 rounded transition-all ${
              isOutputOpen 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'text-gray-400 hover:text-gray-300 hover:bg-white/10'
            }`}
            title="Toggle Output"
          >
            <Code className="w-3.5 h-3.5" />
          </button>

          <button 
            onClick={onToggleProblems}
            className={`p-1 rounded transition-all relative ${
              isProblemsOpen 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'text-gray-400 hover:text-gray-300 hover:bg-white/10'
            }`}
            title="Toggle Problems"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {errors > 0 && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-white font-medium">{errors}</span>
              </div>
            )}
          </button>

          <button 
            onClick={onToggleTerminal}
            className={`p-1 rounded transition-all ${
              isTerminalOpen 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'text-gray-400 hover:text-gray-300 hover:bg-white/10'
            }`}
            title="Toggle Terminal"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Sidebar toggle */}
          <button 
            onClick={onToggleSidebar}
            className={`p-1 rounded transition-all ${
              isSidebarOpen 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' 
                : 'text-gray-400 hover:text-gray-300 hover:bg-white/10'
            }`}
            title="Toggle Sidebar"
          >
            <PanelRightOpen className="w-3.5 h-3.5" />
          </button>

          {/* Layout toggle */}
          <button 
            className="p-1 rounded text-gray-400 hover:text-gray-300 hover:bg-white/10 transition-all"
            title="Toggle Panel Position"
          >
            <PanelBottomOpen className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

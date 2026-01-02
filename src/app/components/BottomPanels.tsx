import { X, Terminal as TerminalIcon, Code, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BottomPanelsProps {
  isTerminalOpen: boolean;
  isOutputOpen: boolean;
  isProblemsOpen: boolean;
  onClose: (panel: 'terminal' | 'output' | 'problems') => void;
}

export function BottomPanels({ 
  isTerminalOpen, 
  isOutputOpen, 
  isProblemsOpen,
  onClose 
}: BottomPanelsProps) {
  // Determine which panel to show (priority: terminal > output > problems)
  const activePanel = isTerminalOpen ? 'terminal' : isOutputOpen ? 'output' : isProblemsOpen ? 'problems' : null;
  const isAnyPanelOpen = isTerminalOpen || isOutputOpen || isProblemsOpen;

  return (
    <AnimatePresence>
      {isAnyPanelOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 280 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="relative w-full flex-shrink-0 overflow-hidden z-10"
        >
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-t border-white/10" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Tab bar */}
            <div className="flex items-center justify-between h-9 px-3 border-b border-white/10">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onClose('terminal')}
                  className={`px-3 py-1 rounded-t text-xs flex items-center gap-2 transition-all ${
                    activePanel === 'terminal'
                      ? 'bg-white/10 text-cyan-400 border-t border-l border-r border-cyan-400/30'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <TerminalIcon className="w-3 h-3" />
                  Terminal
                  {activePanel === 'terminal' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose('terminal');
                      }}
                      className="hover:bg-white/10 rounded p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>

                <button
                  onClick={() => onClose('output')}
                  className={`px-3 py-1 rounded-t text-xs flex items-center gap-2 transition-all ${
                    activePanel === 'output'
                      ? 'bg-white/10 text-cyan-400 border-t border-l border-r border-cyan-400/30'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <Code className="w-3 h-3" />
                  Output
                  {activePanel === 'output' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose('output');
                      }}
                      className="hover:bg-white/10 rounded p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>

                <button
                  onClick={() => onClose('problems')}
                  className={`px-3 py-1 rounded-t text-xs flex items-center gap-2 transition-all ${
                    activePanel === 'problems'
                      ? 'bg-white/10 text-cyan-400 border-t border-l border-r border-cyan-400/30'
                      : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <AlertCircle className="w-3 h-3" />
                  Problems
                  <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-[10px]">7</span>
                  {activePanel === 'problems' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose('problems');
                      }}
                      className="hover:bg-white/10 rounded p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </button>
              </div>

              <button className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-gray-300">
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Panel content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activePanel === 'terminal' && (
                <div className="font-mono text-sm">
                  <div className="text-gray-400 mb-2">
                    <span className="text-cyan-400">poziverse@workspace</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400">~/projects</span>
                    <span className="text-gray-500">$</span>
                  </div>
                  <div className="text-gray-300 mb-2">npm run dev</div>
                  <div className="text-green-400 mb-1">✓ Server started successfully</div>
                  <div className="text-gray-400 mb-1">→ Local: http://localhost:5173</div>
                  <div className="text-gray-400 mb-1">→ Network: http://192.168.1.100:5173</div>
                  <div className="text-gray-500 mb-2">ready in 234 ms</div>
                  <div className="text-gray-400">
                    <span className="text-cyan-400">poziverse@workspace</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-blue-400">~/projects</span>
                    <span className="text-gray-500">$</span>
                    <span className="ml-1 w-2 h-4 bg-cyan-400 inline-block animate-pulse"></span>
                  </div>
                </div>
              )}

              {activePanel === 'output' && (
                <div className="font-mono text-xs space-y-1">
                  <div className="text-gray-500">[12:34:56] Starting compilation...</div>
                  <div className="text-cyan-400">[12:34:57] Building workspace orchestrator</div>
                  <div className="text-gray-400">[12:34:58] ✓ IconNavBar.tsx compiled</div>
                  <div className="text-gray-400">[12:34:58] ✓ ContextualMenu.tsx compiled</div>
                  <div className="text-gray-400">[12:34:58] ✓ Workspace.tsx compiled</div>
                  <div className="text-gray-400">[12:34:58] ✓ MetadataSidebar.tsx compiled</div>
                  <div className="text-green-400">[12:34:59] Build completed successfully</div>
                  <div className="text-blue-400">[12:34:59] Watching for file changes...</div>
                </div>
              )}

              {activePanel === 'problems' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 cursor-pointer transition-colors">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-red-400 font-medium">Error</span>
                        <span className="text-gray-400">Property 'user' does not exist</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        src/app/components/Workspace.tsx:42:18
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 cursor-pointer transition-colors">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-red-400 font-medium">Error</span>
                        <span className="text-gray-400">Cannot find module './utils'</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        src/app/App.tsx:5:23
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-lg bg-yellow-500/5 border border-yellow-500/20 hover:bg-yellow-500/10 cursor-pointer transition-colors">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-400 font-medium">Warning</span>
                        <span className="text-gray-400">Unused variable 'selectedItem'</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        src/app/components/IconNavBar.tsx:12:7
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-lg bg-yellow-500/5 border border-yellow-500/20 hover:bg-yellow-500/10 cursor-pointer transition-colors">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-400 font-medium">Warning</span>
                        <span className="text-gray-400">Missing dependency in useEffect hook</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        src/app/components/ContextualMenu.tsx:28:5
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

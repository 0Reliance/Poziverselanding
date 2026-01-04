/**
 * POZIVERSE WORKSPACE ORCHESTRATOR
 * 
 * A comprehensive workspace management interface with glassmorphism design.
 * 
 * DESKTOP ARCHITECTURE (Priority - 1024px+):
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ TopNavBar - Global search, branding, user actions              │
 * ├──┬────────┬─────────────────────────────────┬──────────────────┤
 * │  │        │                                 │                  │
 * │  │ Icon   │ Contextual Menu (expandable)    │                  │
 * │  │ Nav    ├─────────────────────────────────┤   Metadata      │
 * │  │ Bar    │                                 │   Sidebar       │
 * │  │        │      Workspace Area             │   (toggleable)  │
 * │  │        │                                 │                  │
 * │  │        │                                 │                  │
 * ├──┴────────┴─────────────────────────────────┴──────────────────┤
 * │ BottomPanels - Terminal, Output, Problems (slide up)           │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ BottomStatusBar - Status indicators, panel toggles             │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * MOBILE ARCHITECTURE (Paired Down - <1024px):
 * ┌─────────────────────────────────┐
 * │ MobileTopBar - Logo & Menu      │
 * ├─────────────────────────────────┤
 * │                                 │
 * │                                 │
 * │      Workspace Area             │
 * │      (Simplified Cards)         │
 * │                                 │
 * │                                 │
 * ├─────────────────────────────────┤
 * │ MobileTabBar - Bottom Nav       │
 * └─────────────────────────────────┘
 * 
 * STATE MANAGEMENT:
 * - Navigation: selectedNavItem, expandedMenu
 * - Panels: isTerminalOpen, isOutputOpen, isProblemsOpen (desktop only)
 * - UI: isSidebarOpen (desktop only)
 * 
 * RESPONSIVE STRATEGY:
 * - Desktop (md+): Full featured workspace orchestrator
 * - Mobile (<md): Simplified monitoring/quick access interface
 */

import { useState } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { MobileTopBar } from './components/MobileTopBar';
import { MobileTabBar } from './components/MobileTabBar';
import { IconNavBar } from './components/IconNavBar';
import { ContextualMenu } from './components/ContextualMenu';
import { Workspace } from './components/Workspace';
import { Launchpad } from './components/Launchpad';
import { UserControl } from './components/UserControl';
import { MetadataSidebar } from './components/MetadataSidebar';
import { BottomStatusBar } from './components/BottomStatusBar';
import { BottomPanels } from './components/BottomPanels';
import { ResourcesView } from './components/resources/ResourcesView';
import { HomeView } from './components/HomeView';
import { Project } from './data/projects';
import { LaunchpadItem } from './data/launchpad';
import { User, users } from './data/users';
import { ResourceItem } from './components/resources/types';

export default function App() {
  // Navigation state
  const [expandedMenu, setExpandedMenu] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('home');
  const [selectedLaunchpadCategory, setSelectedLaunchpadCategory] = useState('all');
  const [selectedUserControlView, setSelectedUserControlView] = useState('User Directory');
  const [selectedResourceCategory, setSelectedResourceCategory] = useState('all');
  
  // Selection state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLaunchpadItem, setSelectedLaunchpadItem] = useState<LaunchpadItem | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  
  // Panel visibility state (desktop only)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [isProblemsOpen, setIsProblemsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Panel toggle handlers - ensures only one panel is open at a time
  const handleToggleTerminal = () => {
    if (isTerminalOpen) {
      setIsTerminalOpen(false);
    } else {
      setIsTerminalOpen(true);
      setIsOutputOpen(false);
      setIsProblemsOpen(false);
    }
  };

  const handleToggleOutput = () => {
    if (isOutputOpen) {
      setIsOutputOpen(false);
    } else {
      setIsOutputOpen(true);
      setIsTerminalOpen(false);
      setIsProblemsOpen(false);
    }
  };

  const handleToggleProblems = () => {
    if (isProblemsOpen) {
      setIsProblemsOpen(false);
    } else {
      setIsProblemsOpen(true);
      setIsTerminalOpen(false);
      setIsOutputOpen(false);
    }
  };

  const handleClosePanel = (panel: 'terminal' | 'output' | 'problems') => {
    if (panel === 'terminal') setIsTerminalOpen(false);
    if (panel === 'output') setIsOutputOpen(false);
    if (panel === 'problems') setIsProblemsOpen(false);
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex flex-col">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-yellow-500/10 pointer-events-none" />
      
      {/* Desktop Notice Banner - Hidden on mobile */}
      <div className="relative z-50 md:hidden bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-400/30 px-4 py-2">
        <p className="text-xs text-center text-cyan-400">
          💼 For the full workspace experience, open on desktop
        </p>
      </div>
      
      {/* Top Navigation - Desktop */}
      <div className="hidden md:block">
        <TopNavBar />
      </div>
      
      {/* Top Navigation - Mobile */}
      <div className="md:hidden">
        <MobileTopBar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Desktop Layout - 4 columns */}
        <div className="hidden md:flex flex-1 overflow-hidden">
          {/* Icon Navigation Bar */}
          <IconNavBar 
            selectedItem={selectedNavItem}
            onSelectItem={(item) => {
              setSelectedNavItem(item);
              // Only expand menu for items that have sub-menus or complex views
              if (item !== 'home') {
                setExpandedMenu(true);
              } else {
                setExpandedMenu(false);
              }
            }}
          />
          
          {/* Contextual Menu (expandable) */}
          <ContextualMenu 
            isExpanded={expandedMenu}
            selectedItem={selectedNavItem}
            onCollapse={() => setExpandedMenu(false)}
            onSelectItem={(item) => {
              if (selectedNavItem === 'resources') {
                setSelectedResourceCategory(item);
              } else if (selectedNavItem === 'launchpad') {
                setSelectedLaunchpadCategory(item);
              } else if (selectedNavItem === 'usercontrol') {
                setSelectedUserControlView(item);
              }
            }}
          />
          
          {/* Main Workspace */}
          {selectedNavItem === 'launchpad' ? (
            <Launchpad 
              selectedCategory={selectedLaunchpadCategory} 
              onSelectItem={(item) => {
                setSelectedLaunchpadItem(item);
                setSelectedProject(null);
                setSelectedUser(null);
                setSelectedResource(null);
              }}
            />
          ) : selectedNavItem === 'usercontrol' ? (
            <UserControl 
              selectedView={selectedUserControlView} 
              onSelectUser={(userId) => {
                const user = users.find(u => u.id === userId);
                if (user) {
                  setSelectedUser(user);
                  setSelectedProject(null);
                  setSelectedLaunchpadItem(null);
                  setSelectedResource(null);
                }
              }}
            />
          ) : selectedNavItem === 'resources' ? (
            <ResourcesView 
              selectedCategory={selectedResourceCategory} 
              onSelectItem={(item) => {
                setSelectedResource(item);
                setSelectedProject(null);
                setSelectedLaunchpadItem(null);
                setSelectedUser(null);
              }}
            />
          ) : selectedNavItem === 'home' ? (
            <HomeView onNavigate={(nav) => {
              setSelectedNavItem(nav);
              if (nav !== 'home') setExpandedMenu(true);
            }} />
          ) : (
            <Workspace 
              selectedNavItem={selectedNavItem} 
              onSelectProject={(project) => {
                setSelectedProject(project);
                setSelectedLaunchpadItem(null);
                setSelectedUser(null);
              }}
            />
          )}
          
          {/* Metadata Sidebar (toggleable) */}
          {isSidebarOpen && (
            <MetadataSidebar 
              selectedProject={selectedProject} 
              selectedLaunchpadItem={selectedLaunchpadItem}
              selectedUser={selectedUser}
              selectedResource={selectedResource}
            />
          )}
        </div>

        {/* Mobile Layout - Single column workspace only */}
        <div className="flex-1 md:hidden overflow-hidden pb-16">
          <Workspace 
            selectedNavItem={selectedNavItem} 
            isMobile 
            onSelectProject={setSelectedProject}
          />
        </div>
      </div>
      
      {/* Bottom Panels (Desktop only) */}
      <div className="hidden md:block">
        <BottomPanels
          isTerminalOpen={isTerminalOpen}
          isOutputOpen={isOutputOpen}
          isProblemsOpen={isProblemsOpen}
          onClose={handleClosePanel}
        />
      </div>
      
      {/* Bottom Status Bar (Desktop only) */}
      <div className="hidden md:block">
        <BottomStatusBar
          onToggleTerminal={handleToggleTerminal}
          onToggleOutput={handleToggleOutput}
          onToggleProblems={handleToggleProblems}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isTerminalOpen={isTerminalOpen}
          isOutputOpen={isOutputOpen}
          isProblemsOpen={isProblemsOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden">
        <MobileTabBar
          selectedItem={selectedNavItem}
          onSelectItem={(item) => setSelectedNavItem(item)}
        />
      </div>
    </div>
  );
}
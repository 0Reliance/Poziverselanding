import { useState } from 'react';
import { IconNavBar } from './components/IconNavBar';
import { ContextualMenu } from './components/ContextualMenu';
import { Workspace } from './components/Workspace';
import { MetadataSidebar } from './components/MetadataSidebar';

export default function App() {
  const [expandedMenu, setExpandedMenu] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('home');

  return (
    <div className="h-screen w-screen bg-black overflow-hidden flex">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-yellow-500/10 pointer-events-none" />
      
      {/* Icon Navigation Bar */}
      <IconNavBar 
        selectedItem={selectedNavItem}
        onSelectItem={(item) => {
          setSelectedNavItem(item);
          setExpandedMenu(true);
        }}
      />
      
      {/* Contextual Menu (expandable) */}
      <ContextualMenu 
        isExpanded={expandedMenu}
        selectedItem={selectedNavItem}
        onCollapse={() => setExpandedMenu(false)}
      />
      
      {/* Main Workspace */}
      <Workspace selectedNavItem={selectedNavItem} />
      
      {/* Metadata Sidebar */}
      <MetadataSidebar />
    </div>
  );
}

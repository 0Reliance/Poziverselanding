import { UserDirectory } from './usercontrol/UserDirectory';
import { DirectMessages } from './usercontrol/DirectMessages';
import { UserAdmin } from './usercontrol/UserAdmin';
import { ActivityFeed } from './usercontrol/ActivityFeed';
import { NotificationsView } from './usercontrol/NotificationsView';
import { motion } from 'motion/react';
import { Activity, Bell } from 'lucide-react';

interface UserControlProps {
  selectedView: string;
  isMobile?: boolean;
  onSelectUser?: (userId: string) => void;
}

export function UserControl({ selectedView, isMobile = false, onSelectUser }: UserControlProps) {
  // Render different views based on selection from contextual menu
  const renderView = () => {
    switch (selectedView) {
      case 'User Directory':
      case 'All Users':
        return <UserDirectory isMobile={isMobile} onSelectUser={onSelectUser} />;
      
      case 'My Team':
      case 'Team':
        return <UserDirectory isMobile={isMobile} onSelectUser={onSelectUser} />;
      
      case 'Direct Messages':
      case 'Messages':
        return <DirectMessages isMobile={isMobile} />;
      
      case 'Channels':
      case 'Group Channels':
        return <DirectMessages isMobile={isMobile} />;
      
      case 'User Admin':
      case 'Administration':
        return <UserAdmin isMobile={isMobile} />;
      
      case 'Roles & Permissions':
      case 'Permissions':
        return <UserAdmin isMobile={isMobile} />;
      
      case 'Activity Feed':
      case 'Activity':
        return <ActivityFeed isMobile={isMobile} />;
      
      case 'Notifications':
        return <NotificationsView isMobile={isMobile} />;
      
      default:
        return <UserDirectory isMobile={isMobile} onSelectUser={onSelectUser} />;
    }
  };

  return (
    <div className="relative flex-1 z-10">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative h-full">
        {renderView()}
      </div>
    </div>
  );
}



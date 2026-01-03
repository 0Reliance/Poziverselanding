import { UserDirectory } from './usercontrol/UserDirectory';
import { DirectMessages } from './usercontrol/DirectMessages';
import { UserAdmin } from './usercontrol/UserAdmin';
import { motion } from 'motion/react';
import { Users, MessageSquare, ShieldCheck, Activity, Bell, Users as UsersIcon } from 'lucide-react';

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

// Activity Feed Component
function ActivityFeed({ isMobile = false }: { isMobile?: boolean }) {
  const activities = [
    { id: '1', user: 'Sarah Chen', action: 'created a new project', target: 'Q4 Campaign', time: '5m ago', icon: '📁', color: 'from-cyan-400 to-blue-500' },
    { id: '2', user: 'Marcus Rodriguez', action: 'joined the team', target: 'Design Team', time: '15m ago', icon: '👋', color: 'from-blue-400 to-indigo-500' },
    { id: '3', user: 'Emily Watson', action: 'shared a file', target: 'Brand Guidelines.pdf', time: '1h ago', icon: '📤', color: 'from-purple-400 to-pink-500' },
    { id: '4', user: 'David Kim', action: 'commented on', target: 'Homepage Redesign', time: '2h ago', icon: '💬', color: 'from-green-400 to-emerald-500' },
    { id: '5', user: 'Lisa Anderson', action: 'completed', target: 'User Research Phase', time: '3h ago', icon: '✅', color: 'from-yellow-400 to-orange-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-white/10`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-white ${isMobile ? 'text-xl' : 'text-2xl'} font-semibold`}>
            Activity Feed
          </h2>
        </div>
        <p className="text-gray-400 text-sm">Recent activity across your workspace</p>
      </div>

      {/* Activity List */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'} space-y-4`}>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all p-4">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 mb-1">
                    <span className="text-white font-semibold">{activity.user}</span>
                    {' '}
                    <span className="text-gray-400">{activity.action}</span>
                    {' '}
                    <span className="text-cyan-400">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Notifications View Component
function NotificationsView({ isMobile = false }: { isMobile?: boolean }) {
  const notifications = [
    { id: '1', type: 'mention', message: 'Sarah Chen mentioned you in a comment', time: '5m ago', unread: true },
    { id: '2', type: 'invite', message: 'You were added to Design Team', time: '1h ago', unread: true },
    { id: '3', type: 'update', message: 'Project status changed to In Progress', time: '2h ago', unread: false },
    { id: '4', type: 'message', message: 'New message from Marcus Rodriguez', time: '3h ago', unread: false },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-white/10`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className={`text-white ${isMobile ? 'text-xl' : 'text-2xl'} font-semibold`}>
              Notifications
            </h2>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-gray-300 text-sm transition-all">
            Mark all read
          </button>
        </div>
        <p className="text-gray-400 text-sm">You have {notifications.filter(n => n.unread).length} unread notifications</p>
      </div>

      {/* Notification List */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'} space-y-2`}>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`rounded-xl border transition-all p-4 cursor-pointer ${
              notification.unread
                ? 'border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.unread && (
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-sm mb-1">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

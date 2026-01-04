import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface ActivityFeedProps {
  isMobile?: boolean;
}

export function ActivityFeed({ isMobile = false }: ActivityFeedProps) {
  const activities = [
    { id: '1', user: 'Sarah Chen', action: 'created a new project', target: 'Q4 Campaign', time: '5m ago', icon: '📁', color: 'from-cyan-400 to-blue-500' },
    { id: '2', user: 'Marcus Rodriguez', action: 'joined the team', target: 'Design Team', time: '15m ago', icon: '👋', color: 'from-blue-400 to-indigo-500' },
    { id: '3', user: 'Emily Watson', action: 'shared a file', target: 'Brand Guidelines.pdf', time: '1h ago', icon: '📤', color: 'from-purple-400 to-pink-500' },
    { id: '4', user: 'David Kim', action: 'commented on', target: 'Homepage Redesign', time: '2h ago', icon: '💬', color: 'from-green-400 to-emerald-500' },
    { id: '5', user: 'Lisa Anderson', action: 'completed', target: 'User Research Phase', time: '3h ago', icon: '✅', color: 'from-yellow-400 to-orange-500' },
    { id: '6', user: 'System', action: 'deployed', target: 'Production Build v2.4.0', time: '4h ago', icon: '🚀', color: 'from-red-400 to-orange-500' },
    { id: '7', user: 'Sarah Chen', action: 'updated', target: 'User Persona Templates', time: '5h ago', icon: '📝', color: 'from-cyan-400 to-blue-500' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-white/10`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
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
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative group"
          >
            <div className="absolute left-6 top-10 bottom-[-20px] w-px bg-white/10 group-last:hidden" />
            
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} p-[1px] flex-shrink-0`}>
                <div className="w-full h-full rounded-[11px] bg-black/40 backdrop-blur-sm flex items-center justify-center text-xl">
                  {activity.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{activity.user}</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <p className="text-gray-400 text-sm">
                  {activity.action} <span className="text-cyan-400">{activity.target}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

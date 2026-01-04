import { motion } from 'motion/react';
import { Bell } from 'lucide-react';

interface NotificationsViewProps {
  isMobile?: boolean;
}

export function NotificationsView({ isMobile = false }: NotificationsViewProps) {
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

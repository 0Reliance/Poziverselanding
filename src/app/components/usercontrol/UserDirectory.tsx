import { motion } from 'motion/react';
import { Search, UserPlus, Mail, MessageSquare, MoreVertical, Shield, Crown, Zap } from 'lucide-react';
import { useState } from 'react';
import { users } from '../../data/users';

interface UserDirectoryProps {
  isMobile?: boolean;
  onSelectUser?: (userId: string) => void;
}

export function UserDirectory({ isMobile = false, onSelectUser }: UserDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]';
      case 'away': return 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'from-cyan-400 to-blue-500';
      case 'member': return 'from-blue-400 to-indigo-500';
      case 'guest': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3" />;
      case 'member': return <Shield className="w-3 h-3" />;
      case 'guest': return <Zap className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filter Bar */}
      <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-4`}>
        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
          <div className="relative flex items-center gap-3 px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Search users by name, email, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterRole('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filterRole === 'all'
                ? 'bg-cyan-400/20 border border-cyan-400/30 text-cyan-400'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setFilterRole('admin')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filterRole === 'admin'
                ? 'bg-cyan-400/20 border border-cyan-400/30 text-cyan-400'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            Admins
          </button>
          <button
            onClick={() => setFilterRole('member')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filterRole === 'member'
                ? 'bg-cyan-400/20 border border-cyan-400/30 text-cyan-400'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setFilterRole('guest')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              filterRole === 'guest'
                ? 'bg-cyan-400/20 border border-cyan-400/30 text-cyan-400'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            Guests
          </button>
        </div>
      </div>

      {/* User Grid */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'px-4 pb-4' : 'px-6 pb-6'}`}>
        <div className={`grid gap-4 ${
          isMobile 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onMouseEnter={() => setHoveredUser(user.id)}
              onMouseLeave={() => setHoveredUser(null)}
              onClick={() => onSelectUser?.(user.id)}
              className="relative group cursor-pointer"
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${getRoleColor(user.role)} rounded-2xl opacity-0 blur-xl`}
                animate={{ opacity: hoveredUser === user.id ? 0.3 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Card */}
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                {/* Header with gradient */}
                <div className={`h-20 bg-gradient-to-br ${getRoleColor(user.role)} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Role badge */}
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 flex items-center gap-1">
                    {getRoleIcon(user.role)}
                    <span className="text-xs text-white capitalize">{user.role}</span>
                  </div>
                </div>

                {/* Avatar */}
                <div className="px-5 -mt-8">
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center text-3xl shadow-xl">
                    {user.avatar}
                    
                    {/* Status indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(user.status)} border-2 border-black/50`} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-3">
                  <h3 className="text-white font-semibold mb-1">{user.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{user.department}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div>
                      <p className="text-xs text-gray-500">Projects</p>
                      <p className="text-white font-semibold">{user.projects}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Active</p>
                      <p className="text-white font-semibold text-sm">{user.lastActive}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle message action
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-cyan-400/20 border border-cyan-400/30 hover:bg-cyan-400/30 text-cyan-400 text-sm transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Message
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-gray-300 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-gray-300 transition-all"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg mb-2">No users found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Add User Button (Fixed) */}
      <div className="absolute bottom-6 right-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 border border-cyan-400/30 shadow-xl shadow-cyan-400/20 flex items-center justify-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <UserPlus className="w-6 h-6 text-white relative z-10" />
        </motion.button>
      </div>
    </div>
  );
}

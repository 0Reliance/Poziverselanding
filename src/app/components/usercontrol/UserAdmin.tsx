import { motion } from 'motion/react';
import { UserPlus, Search, Shield, Crown, Check, X, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface UserAdminProps {
  isMobile?: boolean;
}

export function UserAdmin({ isMobile = false }: UserAdminProps) {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member',
    department: '',
    password: '',
  });

  const handleCreateUser = () => {
    console.log('Creating user:', formData);
    setView('list');
    setFormData({ name: '', email: '', role: 'member', department: '', password: '' });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-white/10`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-white ${isMobile ? 'text-xl' : 'text-2xl'} font-semibold mb-2`}>
              User Administration
            </h2>
            <p className="text-gray-400 text-sm">Create and manage user accounts</p>
          </div>
          
          <motion.button
            onClick={() => setView(view === 'list' ? 'create' : 'list')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400 text-sm transition-all relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="relative flex items-center gap-2">
              {view === 'list' ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create User
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  Cancel
                </>
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${isMobile ? 'p-4' : 'p-6'}`}>
        {view === 'create' ? (
          /* Create User Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              {/* Form Header */}
              <div className="h-24 bg-gradient-to-br from-cyan-400 to-blue-500 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter full name"
                      className="relative w-full bg-transparent text-gray-300 placeholder:text-gray-500 outline-none px-4 py-3"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@poziverse.io"
                      className="relative w-full bg-transparent text-gray-300 placeholder:text-gray-500 outline-none px-4 py-3"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['admin', 'member', 'guest'].map((role) => (
                      <button
                        key={role}
                        onClick={() => setFormData({ ...formData, role })}
                        className={`px-4 py-3 rounded-xl transition-all ${
                          formData.role === role
                            ? 'bg-cyan-400/20 border border-cyan-400/30 text-cyan-400'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {role === 'admin' && <Crown className="w-4 h-4" />}
                          {role === 'member' && <Shield className="w-4 h-4" />}
                          <span className="capitalize text-sm font-medium">{role}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Department</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="relative w-full bg-transparent text-gray-300 outline-none px-4 py-3 appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-gray-900">Select department</option>
                      <option value="Engineering" className="bg-gray-900">Engineering</option>
                      <option value="Design" className="bg-gray-900">Design</option>
                      <option value="Marketing" className="bg-gray-900">Marketing</option>
                      <option value="Product" className="bg-gray-900">Product</option>
                      <option value="Operations" className="bg-gray-900">Operations</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Temporary Password</label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter temporary password"
                      className="relative w-full bg-transparent text-gray-300 placeholder:text-gray-500 outline-none px-4 py-3"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">User will be prompted to change on first login</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={handleCreateUser}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400 font-medium transition-all relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <div className="relative flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Create User
                    </div>
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* User List/Table View */
          <div className="space-y-4">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
              <div className="relative flex items-center gap-3 px-4 py-3">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none"
                />
              </div>
            </div>

            {/* User Table */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">User</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Role</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Department</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {['Sarah Chen', 'Marcus Rodriguez', 'Emily Watson', 'David Kim'].map((name, index) => (
                    <motion.tr
                      key={name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {name[0]}
                          </div>
                          <div>
                            <p className="text-white font-medium">{name}</p>
                            <p className="text-gray-500 text-xs">{name.toLowerCase().replace(' ', '.')}@poziverse.io</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 text-xs font-medium">
                          {index === 0 ? 'Admin' : 'Member'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {['Engineering', 'Design', 'Marketing', 'Product'][index]}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                          <span className="text-gray-400 text-sm">Active</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

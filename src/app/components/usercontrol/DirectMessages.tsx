import { motion } from 'motion/react';
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info } from 'lucide-react';
import { useState } from 'react';

interface Conversation {
  id: string;
  user: {
    name: string;
    avatar: string;
    status: 'online' | 'away' | 'offline';
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  content: string;
  timestamp: string;
}

const mockConversations: Conversation[] = [
  { id: '1', user: { name: 'Sarah Chen', avatar: '👩‍💼', status: 'online' }, lastMessage: 'Hey, I sent you the design files', timestamp: '2m ago', unread: 2 },
  { id: '2', user: { name: 'Marcus Rodriguez', avatar: '👨‍💻', status: 'online' }, lastMessage: 'Thanks for the update!', timestamp: '15m ago', unread: 0 },
  { id: '3', user: { name: 'Emily Watson', avatar: '👩‍🎨', status: 'away' }, lastMessage: 'Can we schedule a meeting?', timestamp: '1h ago', unread: 1 },
  { id: '4', user: { name: 'David Kim', avatar: '👨‍🔬', status: 'online' }, lastMessage: 'The deployment is complete', timestamp: '3h ago', unread: 0 },
  { id: '5', user: { name: 'Lisa Anderson', avatar: '👩‍🚀', status: 'offline' }, lastMessage: 'See you tomorrow', timestamp: '1d ago', unread: 0 },
];

const mockMessages: Message[] = [
  { id: '1', sender: 'them', content: 'Hey! How\'s the project going?', timestamp: '10:30 AM' },
  { id: '2', sender: 'me', content: 'Going well! Just finished the user interface redesign.', timestamp: '10:32 AM' },
  { id: '3', sender: 'them', content: 'That\'s great! Can you send me the files?', timestamp: '10:33 AM' },
  { id: '4', sender: 'them', content: 'I\'d love to review them before the meeting.', timestamp: '10:33 AM' },
  { id: '5', sender: 'me', content: 'Sure thing! Uploading them now.', timestamp: '10:35 AM' },
  { id: '6', sender: 'them', content: 'Hey, I sent you the design files', timestamp: '10:45 AM' },
];

interface DirectMessagesProps {
  isMobile?: boolean;
}

export function DirectMessages({ isMobile = false }: DirectMessagesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageText, setMessageText] = useState('');

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className={`${isMobile ? 'w-full' : 'w-80'} border-r border-white/10 flex flex-col bg-white/[0.02]`}>
        {/* Search */}
        <div className="p-4 border-b border-white/10">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
            <div className="relative flex items-center gap-3 px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((conv) => (
            <motion.button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 flex items-start gap-3 border-b border-white/5 transition-all ${
                selectedConversation === conv.id
                  ? 'bg-cyan-400/10 border-l-2 border-l-cyan-400'
                  : 'hover:bg-white/5'
              }`}
              whileHover={{ x: 4 }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center text-2xl">
                  {conv.user.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getStatusColor(conv.user.status)} border-2 border-black/50`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-semibold text-sm">{conv.user.name}</h4>
                  <span className="text-xs text-gray-500">{conv.timestamp}</span>
                </div>
                <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
              </div>

              {/* Unread badge */}
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                  <span className="text-xs text-black font-semibold">{conv.unread}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {!isMobile && selectedConv && (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center text-xl">
                  {selectedConv.user.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getStatusColor(selectedConv.user.status)} border-2 border-black/50`} />
              </div>
              <div>
                <h3 className="text-white font-semibold">{selectedConv.user.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{selectedConv.user.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Video className="w-4 h-4 text-gray-400" />
              </button>
              <button className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Info className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {mockMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${msg.sender === 'me' ? 'ml-12' : 'mr-12'}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30'
                      : 'bg-white/10 border border-white/10'
                  }`}>
                    <p className="text-gray-200 text-sm">{msg.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">{msg.timestamp}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 bg-white/[0.02]">
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/30 transition-colors" />
              <div className="relative flex items-center gap-3 px-4 py-3">
                <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent text-gray-300 placeholder:text-gray-500 outline-none"
                />
                <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 hover:shadow-lg hover:shadow-cyan-400/20 flex items-center justify-center transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// src/pages/Messages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Search, ChevronLeft, MoreVertical, User } from 'lucide-react';

const dummyConversations = [
  { id: 1, name: 'Jane Muthoni', lastSeen: '2 hours ago' },
  { id: 2, name: 'Brian Otieno', lastSeen: 'just now' },
  { id: 3, name: 'Linet Wambui', lastSeen: 'yesterday' },
  { id: 4, name: 'David Kimani', lastSeen: '5 minutes ago' },
  { id: 5, name: 'Sarah Achieng', lastSeen: '1 day ago' },
];

const getInitialMessages = (userId) => {
  const baseMessages = {
    1: [
      { from: 'them', text: 'Hey, did you get the documents I sent?', time: new Date(Date.now() - 3600000).toISOString() },
      { from: 'me', text: 'Yes, just finished reviewing them', time: new Date(Date.now() - 3500000).toISOString() },
      { from: 'them', text: 'Great! Any feedback?', time: new Date(Date.now() - 3400000).toISOString() },
    ],
    2: [
      { from: 'me', text: 'Meeting tomorrow at 10am?', time: new Date(Date.now() - 86400000).toISOString() },
      { from: 'them', text: 'Works for me. Conference room 3?', time: new Date(Date.now() - 86300000).toISOString() },
    ],
    3: [
      { from: 'them', text: 'Happy birthday! 🎉', time: new Date(Date.now() - 172800000).toISOString() },
      { from: 'me', text: 'Thank you! 😊', time: new Date(Date.now() - 172700000).toISOString() },
    ],
    4: [
      { from: 'me', text: 'Can you send the budget report?', time: new Date(Date.now() - 300000).toISOString() },
      { from: 'them', text: 'Sure, attaching it now', time: new Date(Date.now() - 290000).toISOString() },
    ],
    5: [
      { from: 'them', text: 'Are we still on for lunch?', time: new Date(Date.now() - 86400000).toISOString() },
      { from: 'me', text: 'Absolutely! See you at 1pm', time: new Date(Date.now() - 86300000).toISOString() },
    ]
  };
  
  return baseMessages[userId] || [];
};

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState(dummyConversations[0]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('messages') || '{}');
    // Initialize with default messages if none exist
    const initializedMessages = {};
    dummyConversations.forEach(conv => {
      initializedMessages[conv.id] = stored[conv.id] || getInitialMessages(conv.id);
    });
    setMessages(initializedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedMessages = {
      ...messages,
      [selectedUser.id]: [
        ...(messages[selectedUser.id] || []),
        { from: 'me', text: newMessage, time: new Date().toISOString() },
      ],
    };
    setMessages(updatedMessages);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredConversations = dummyConversations.filter(conv => 
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${isMobile && selectedUser ? 'hidden' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                if (isMobile) {
                  // Hide sidebar on mobile when selecting conversation
                  document.querySelector('.conversation-list')?.classList.add('hidden');
                }
              }}
              className={`p-4 flex items-center gap-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedUser.id === user.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center text-gray-500">
                <User size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{user.lastSeen}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {(messages[user.id] || []).length > 0 
                    ? messages[user.id][messages[user.id].length - 1].text 
                    : 'Start a conversation...'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Panel - Show only when conversation is selected on mobile */}
      <main className={`flex-1 flex flex-col ${isMobile && !selectedUser ? 'hidden' : 'flex'}`}>
        {/* Chat Header */}
        <div className="bg-white shadow-sm px-4 py-3 border-b border-gray-200 flex items-center gap-3">
          {isMobile && (
            <button 
              onClick={() => setSelectedUser(null)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
          )}
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center text-gray-500">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{selectedUser.name}</h3>
            <p className="text-xs text-gray-500">Online • {selectedUser.lastSeen}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreVertical size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-3xl mx-auto space-y-5">
            {(messages[selectedUser.id] || []).map((msg, idx) => {
              const date = new Date(msg.time);
              const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              return (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.from === 'me'
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="text-base">{msg.text}</p>
                    <div className={`text-xs mt-1 ${msg.from === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {timeString}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto flex gap-2">
            <div className="flex-1 bg-gray-100 rounded-2xl flex">
              <textarea
                rows="1"
                className="flex-1 bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-gray-800 focus:outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                newMessage.trim()
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-300 cursor-not-allowed'
              } transition-colors`}
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
import { useChat } from '../context/ChatContext';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { motion, AnimatePresence } from 'framer-motion';

export const ConversationHistory = () => {
  const { conversations, currentConversation, selectConversation, startNewChat, deleteConversation } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const handleDeleteClick = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation();
    setConversationToDelete(conversationId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (conversationToDelete) {
      deleteConversation(conversationToDelete);
      setDeleteModalOpen(false);
      setConversationToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setConversationToDelete(null);
  };

  const conversationToDeleteTitle = conversations.find(c => c.id === conversationToDelete)?.title || '';

  // Track mobile state and set sidebar open state
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, sidebar should always be visible
      if (!mobile) {
        setIsOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper function to truncate title to 2 words on mobile
  const truncateTitle = (title: string) => {
    if (!isMobile) return title;
    const words = title.split(' ');
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + '...';
    }
    return title;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-30 p-3 bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-xl shadow-2xl"
      >
        <MessageSquare className="w-5 h-5 text-slate-200" />
      </motion.button>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isMobile ? (isOpen ? 0 : '-100%') : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed md:static left-0 top-0 h-full w-72 bg-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 z-30`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-slate-700/50">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-100">
                Conversations
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-1.5 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <span className="text-slate-300 text-lg">×</span>
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                startNewChat();
                setIsOpen(false); // Close sidebar on mobile
              }}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50"
              title="Start a new conversation (Ctrl+N)"
              aria-label="Start new chat"
            >
              <Plus className="w-5 h-5" />
              New Chat
            </motion.button>
            <p className="text-xs text-slate-500 mt-2 text-center">
              {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-3">
            {conversations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-slate-400"
              >
                <MessageSquare className="w-14 h-14 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No conversations yet</p>
                <p className="text-xs mt-2 text-slate-500">Start a new chat to begin</p>
              </motion.div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {conversations.map((conversation, index) => (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className={`group relative w-full p-4 rounded-xl transition-all duration-200 ${
                        currentConversation?.id === conversation.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/10'
                          : 'hover:bg-slate-700/50 border-2 border-transparent hover:border-slate-600/50'
                      }`}
                    >
                      <button
                        onClick={() => {
                          selectConversation(conversation.id);
                          setIsOpen(false);
                        }}
                        className="w-full text-left"
                      >
                        <p
                          className={`font-semibold text-sm mb-2 pr-8 ${
                            currentConversation?.id === conversation.id
                              ? 'text-blue-300'
                              : 'text-slate-200'
                          }`}
                          title={conversation.title}
                        >
                          {truncateTitle(conversation.title)}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-400">
                            {formatDate(conversation.updatedAt)}
                          </p>
                          <span className="text-xs text-slate-500">
                            {conversation.messages.length} msgs
                          </span>
                        </div>
                      </button>
                      
                      {/* Delete Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleDeleteClick(e, conversation.id)}
                        className="absolute top-3 right-3 p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-all duration-200"
                        aria-label="Delete conversation"
                        title="Delete conversation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        conversationTitle={conversationToDeleteTitle}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

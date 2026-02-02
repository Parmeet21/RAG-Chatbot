import { useEffect, useRef, useState } from 'react';
import { useChat } from '../context/ChatContext';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { AlertCircle, X, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatContainer = () => {
  const { messages, isLoading, error, clearError, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop } = containerRef.current;
        setShowScrollTop(scrollTop > 300);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  const handleRetry = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMessage) {
        sendMessage(lastUserMessage.content);
      }
    }
  };

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto flex overflow-x-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center space-y-8 max-w-2xl"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
                >
                  <svg
                    className="w-14 h-14 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full border-4 border-slate-900 shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Welcome to RAG Chatbot
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  How can I help you today? Ask me anything! I'll provide helpful answers and cite relevant documents when available.
                </p>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ChatMessage message={message} />
              </motion.div>
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} className="h-4" />
          </>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-3 px-5 py-4 bg-red-900/90 backdrop-blur-lg border border-red-500/50 rounded-xl shadow-2xl shadow-red-500/20 max-w-md">
              <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0" />
              <p className="text-sm text-red-100 flex-1">{error}</p>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRetry}
                    className="px-3 py-1.5 text-xs font-medium bg-red-800/50 hover:bg-red-800 text-red-100 rounded-lg transition-colors"
                    title="Retry last message"
                  >
                    Retry
                  </motion.button>
                )}
                <button
                  onClick={clearError}
                  className="p-1.5 hover:bg-red-800/50 rounded-lg transition-colors"
                  aria-label="Close error"
                >
                  <X className="w-4 h-4 text-red-300" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-24 right-6 z-40 p-3 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

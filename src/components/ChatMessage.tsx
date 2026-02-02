import type { Message } from '../types';
import { Citation } from './Citation';
import { User, Bot, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 sm:gap-4 px-3 sm:px-6 py-4 sm:py-6 group ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30"
        >
          <Bot className="w-6 h-6 text-white" />
        </motion.div>
      )}

      <div
        className={`flex flex-col max-w-[75%] md:max-w-[65%] lg:max-w-[60%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-2xl px-6 py-5 shadow-2xl backdrop-blur-sm ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-blue-500/30'
              : 'bg-slate-800/90 text-slate-100 border border-slate-700/50 shadow-slate-900/50'
          }`}
        >
          <p className="whitespace-pre-wrap break-words leading-relaxed text-[15px] pr-10">{message.content}</p>
          
          {/* Copy Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
              isUser
                ? 'hover:bg-blue-700/50 text-white/80 hover:text-white'
                : 'hover:bg-slate-700/50 text-slate-400 hover:text-slate-200'
            } opacity-100 md:opacity-0 md:group-hover:opacity-100`}
            aria-label={copied ? "Copied!" : "Copy message"}
            title={copied ? "Copied!" : "Copy message (Ctrl+C)"}
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </motion.button>
        </motion.div>

        {!isUser && message.citations && message.citations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex flex-wrap gap-2 sm:gap-3 w-full overflow-hidden"
          >
            {message.citations.map((citation, index) => (
              <Citation key={citation.id} citation={citation} index={index} />
            ))}
          </motion.div>
        )}

        <span className="mt-2 text-xs text-slate-400 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {isUser && (
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-xl"
        >
          <User className="w-6 h-6 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

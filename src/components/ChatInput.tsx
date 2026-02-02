import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { useChat } from '../context/ChatContext';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ChatInput = () => {
  const { sendMessage, isLoading, messages } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxLength = 2000;

  // Focus input after message is sent and response is received
  useEffect(() => {
    if (!isLoading && textareaRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isLoading]);

  // Focus input on mount (only on desktop)
  useEffect(() => {
    // Only auto-focus on desktop to avoid mobile keyboard issues
    if (window.innerWidth >= 768) {
      textareaRef.current?.focus();
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const message = input.trim();
    setInput('');
    await sendMessage(message);
    // Focus will be restored by the isLoading useEffect
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const exampleQuestions = [
    "What is React?",
    "Explain TypeScript",
    "How to use Tailwind CSS?",
    "What is Redux?",
    "React Hook Form tutorial"
  ];

  const handleExampleClick = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  const inputLength = input.length;
  const isNearLimit = inputLength > maxLength * 0.8;

  return (
    <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-lg p-4 sm:p-6 overflow-x-hidden">
      {/* Example Questions */}
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-4"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {exampleQuestions.slice(0, 3).map((question, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExampleClick(question)}
                className="px-4 py-2 text-xs sm:text-sm bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-slate-300 hover:text-slate-100 transition-all duration-200"
                title={`Click to use: ${question}`}
              >
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      <div className="max-w-5xl mx-auto flex gap-2 sm:gap-4 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setInput(e.target.value);
              }
            }}
            onKeyDown={handleKeyPress}
            placeholder="Ask question"
            disabled={isLoading}
            rows={1}
            className="w-full px-3 py-2.5 sm:px-6 sm:py-4 pr-12 sm:pr-16 border border-slate-600/50 rounded-xl sm:rounded-2xl focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none bg-slate-800/80 text-slate-100 placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-[15px] shadow-lg overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ minHeight: '44px', maxHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
            aria-label="Chat input"
            aria-describedby="input-hint"
          />
          {/* Character count */}
          {inputLength > 0 && (
            <div className={`absolute bottom-1.5 sm:bottom-2 right-10 sm:right-14 text-xs ${isNearLimit ? 'text-orange-400' : 'text-slate-500'}`}>
              {inputLength}/{maxLength}
            </div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={!input.trim() || isLoading || inputLength > maxLength}
          className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
          title={!input.trim() ? "Type a message to send" : "Send message (Enter)"}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
          ) : (
            <Send className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          )}
        </motion.button>
      </div>

      {isLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-slate-400 mt-3"
        >
          Please wait while I process your request...
        </motion.p>
      )}

      {/* Input hint for screen readers */}
      <div id="input-hint" className="sr-only">
        Type your question and press Enter to send. Use Shift+Enter for a new line.
      </div>
    </div>
  );
};

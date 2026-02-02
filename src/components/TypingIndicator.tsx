import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const TypingIndicator = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '') return '.';
        if (prev === '.') return '..';
        if (prev === '..') return '...';
        return '';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-6 py-5"
    >
      <div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
            className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg shadow-purple-500/50"
          />
        ))}
      </div>
      <span className="ml-2 text-sm font-medium text-slate-400" aria-live="polite" aria-atomic="true">
        AI is thinking{dots}
      </span>
    </motion.div>
  );
};

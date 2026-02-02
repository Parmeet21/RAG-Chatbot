import type { Citation as CitationType } from '../types';
import { useChat } from '../context/ChatContext';
import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface CitationProps {
  citation: CitationType;
  index: number;
}

export const Citation = ({ citation, index }: CitationProps) => {
  const { openDocumentViewer } = useChat();

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openDocumentViewer(citation)}
      className="group relative inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-medium text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm max-w-full overflow-hidden"
      title={`Click to view: ${citation.documentTitle} (Page ${citation.pageNumber})`}
      aria-label={`View citation ${index + 1}: ${citation.documentTitle} page ${citation.pageNumber}`}
    >
      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-blue-400" />
      <span className="font-bold flex-shrink-0 text-blue-400 text-xs sm:text-sm">[{index + 1}]</span>
      <span className="min-w-0 flex-1 truncate text-slate-200 text-xs sm:text-sm">{citation.documentTitle}</span>
      <span className="text-blue-400 flex-shrink-0 font-semibold text-xs sm:text-sm whitespace-nowrap">p.{citation.pageNumber}</span>
    </motion.button>
  );
};
